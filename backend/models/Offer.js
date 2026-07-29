import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'flat'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  bannerImage: String,
  description: String,
  validFrom: { type: Date, default: Date.now },
  validTo: { type: Date, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model('Offer', offerSchema);
