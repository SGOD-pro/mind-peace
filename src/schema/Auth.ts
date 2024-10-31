import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Auth extends Document {
	email: string;
	password: string;
	role: number;
	avatar: string;
	provider: string;
	refreshToken: string;
	createdAt: Date;
	updatedAt: Date;
}

const AuthSchema = new Schema<Auth>(
	{
		email: { type: String, required: true },
		password: { type: String},
		avatar: { type: String },
		role: { type: Number, required: true, default: 0 }, // NOTE: 0 = user, 1 = therapist, 2 = admin
		provider: {
			type: String,
			required: true,
			default: "email",
			enum: ["email", "google"],
		},
		refreshToken: { type: String, required: true },
	},
	{ timestamps: true }
);

AuthSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});
AuthSchema.methods.isPasswordCorrect = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

AuthSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{ _id: this._id, email: this.email },
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: process.env.ACCESS_TOKEN_EXP }
	);
};

AuthSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN!, {
		expiresIn: process.env.REFRESH_TOKEN_EXP,
	});
};

const AuthModel: Model<Auth> =
	mongoose.models.attendences || mongoose.model<Auth>("auths", AuthSchema);
export default AuthModel;
