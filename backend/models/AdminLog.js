import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  targetCollection: String,
  targetId: String,
  ipAddress: String
}, { timestamps: true });

export default mongoose.models.AdminLog || mongoose.model('AdminLog', adminLogSchema);
