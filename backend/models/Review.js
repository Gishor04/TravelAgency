import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userAvatar: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: { type: String, required: true },
  images: [String],
  videoUrl: String,
  verifiedBooking: { type: Boolean, default: true },
  helpfulVotes: { type: Number, default: 0 },
  status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
