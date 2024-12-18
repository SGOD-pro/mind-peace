import mongoose, { Document, Schema, model, Types, Model } from "mongoose";

// Define TypeScript interfaces for the schema

interface IAppointment extends Document {
	name: string;
	age: number;
	date: Date;
	therapistId: Types.ObjectId;
	userId?: Types.ObjectId;
	status: "PENDING" | "CANCEL" | "SUCCESS";
	createdAt?: Date;
	updatedAt?: Date;
	appointmentId: string;
}

const appointmentSchema = new Schema<IAppointment>(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
		date: { type: Date, required: true },
		therapistId: { type: Schema.Types.ObjectId, ref: "therapists", required: true },
		userId: { type: Schema.Types.ObjectId, ref: "auths" },
		status: {
			type: String,
			default: "PENDING",
			enum: ["PENDING", "CANCEL", "SUCCESS"],
		},
		appointmentId: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Appointment: Model<IAppointment> =
	mongoose.models.appointments ||
	model<IAppointment>("appointments", appointmentSchema);

export default Appointment;
