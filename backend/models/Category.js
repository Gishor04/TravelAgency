import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'Compass' },
  description: String,
  image: String,
  packageCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
