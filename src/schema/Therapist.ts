import mongoose, { Schema, Document, Model } from "mongoose";

// Define TypeScript interfaces for the data types
interface Qualification {
	degree: string;
	group: string;
}

export interface DoctorDocument extends Document {
	name: string;
	qualification: Qualification;
	experience: number;
	speciality: string;
	email: string;
	contactNo: string;
	timing: string;
	days: string[];
	clinicLocation: string;
	charges: number;
	image?: string;
	username?: string;
	createdAt:Date;
	updatedAt:Date
}

const QualificationSchema = new Schema<Qualification>({
	degree: { type: String, required: true },
	group: { type: String, required: true },
});

const DoctorSchema = new Schema<DoctorDocument>({
	name: { type: String, required: true },
	qualification: { type: QualificationSchema, required: true },
	experience: { type: Number, required: true },
	speciality: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	contactNo: {
		type: String,
		required: true,
		validate: {
			validator: (v: string) => /\d{10,}/.test(v),
			message: (props: { value: string }) =>
				`${props.value} is not a valid phone number!`,
		},
	},
	timing: { type: String, required: true },
	days: { type: [String], required: true },
	clinicLocation: { type: String, required: true },
	charges: { type: Number, required: true },
	image: { type: String },
	username: { type: String },
},{timestamps: true});

// Model with type casting
const TherapistModel: Model<DoctorDocument> =
	mongoose.models.doctors ||
	mongoose.model<DoctorDocument>("therapists", DoctorSchema);

export default TherapistModel;
