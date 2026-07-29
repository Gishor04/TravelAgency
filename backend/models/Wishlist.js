import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' }]
}, { timestamps: true });

export default mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
