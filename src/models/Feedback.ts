import mongoose, { Schema, Document, Model } from 'mongoose';

interface IFeedback extends Document {
  comment: string;
  appointmentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  rating: number
}
const feedbackSchema: Schema<IFeedback> = new Schema({
  comment: {
    type: String,
    required: true
  },
  
  rating: {
    type: Number,
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'appointments',
  }
},{timestamps: true});

const FeedbackModel: Model<IFeedback> = mongoose.models.feedbacks || mongoose.model<IFeedback>('feedbacks', feedbackSchema);

export default FeedbackModel;
