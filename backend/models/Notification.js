import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['booking', 'payment', 'offer', 'system'], default: 'system' },
  isRead: { type: Boolean, default: false },
  link: String
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
