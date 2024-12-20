import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface AuthSchemaInterface extends Document {
	email: string;
	password?: string;
	role: number;
	avatar: string;
	provider: string;
	refreshToken: string;
	createdAt: Date;
	updatedAt: Date;
	isPasswordCorrect(password: string): Promise<boolean>;
	generateAccessToken(): string;
	generateRefreshToken(): string;
}

const AuthSchema = new Schema<AuthSchemaInterface>(
	{
		email: { type: String, required: true ,unique: true},
		password: { type: String },
		avatar: { type: String },
		role: { type: Number, required: true, default: 0 }, // NOTE: 0 = user, 1 = therapist, 2 = admin
		provider: {
			type: String,
			required: true,
			default: "email",
			enum: ["email", "google"],
		},
		refreshToken: { type: String },
	},
	{ timestamps: true }
);

AuthSchema.pre("save", async function (next) {
	if (this.isModified("password") && this.password) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});
AuthSchema.methods.isPasswordCorrect = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

AuthSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{ _id: this._id, email: this.email, role: this.role, provider: this.provider },
		process.env.ACCESS_TOKEN!,
		{ expiresIn: process.env.ACCESS_TOKEN_EXP }
	);
};

AuthSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN!, {
		expiresIn: process.env.REFRESH_TOKEN_EXP,
	});
};

const AuthModel: Model<AuthSchemaInterface> =
    mongoose.models.auths || mongoose.model<AuthSchemaInterface>("auths", AuthSchema);

export default AuthModel;