import mongoose, { Document, Model, Schema } from "mongoose";

export interface TherapistDocument extends Document {
	name: string;
	qualification: string;
	experience: number;
	speciality: string;
	email: string;
	contactNo: string;
	timing: {
		from: string;
		to: string;
	};
	days: string[];
	clinicLocation: string;
	charges: number;
	image?: string;
	createdAt: Date;
	updatedAt: Date;
}

const TherapistSchema = new Schema<TherapistDocument>(
	{
		name: { type: String, required: true },
		qualification: { type: String, required: true },
		experience: { type: Number, required: true },
		speciality: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		contactNo: { type: String, required: true },
		timing: {
			from: { type: String, required: true },
			to: { type: String, required: true },
		},
		days: { type: [String], required: true },
		clinicLocation: { type: String, required: true },
		charges: { type: Number, required: true },
		image: { type: String, required: false },
	},
	{ timestamps: true }
);

const TherapistModel: Model<TherapistDocument> =
	mongoose.models.therapists ||
	mongoose.model<TherapistDocument>("therapists", TherapistSchema);

export default TherapistModel;
