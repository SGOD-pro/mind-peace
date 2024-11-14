import mongoose, { Document, Schema, model, Types, Model } from 'mongoose';

// Define TypeScript interfaces for the schema
interface IUser {
    fullname: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    issue: string;
    date: string;
    time: string;
}

interface IAppointment extends Document {
    user: IUser;
    doctorId: Types.ObjectId;
    userId?: Types.ObjectId;  
    feedback?: string;
    status: 'PENDING' | 'CANCEL' | 'SUCCESS';
    createdAt?: Date;
    updatedAt?: Date;
}

const appointmentSchema = new Schema<IAppointment>({
    user: {
        fullname: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
        issue: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true }
    },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctors', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    feedback: { type: String },
    status: { type: String, default: 'PENDING', enum: ['PENDING', 'CANCEL', 'SUCCESS'] }
}, {
    timestamps: true
});


const Appointment:Model<IAppointment> = mongoose.models.appointments || model<IAppointment>('appointments', appointmentSchema);

export default Appointment;
