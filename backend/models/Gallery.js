import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'drone', 'virtual_tour'], default: 'image' },
  mediaUrl: { type: String, required: true },
  thumbnail: String,
  destination: String,
  country: String,
  tags: [String]
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
