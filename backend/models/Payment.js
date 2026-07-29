import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  provider: { type: String, enum: ['stripe', 'payhere', 'bank_transfer', 'cash'], default: 'stripe' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['succeeded', 'pending', 'failed', 'refunded'], default: 'succeeded' },
  receiptUrl: String,
  paymentDetails: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
