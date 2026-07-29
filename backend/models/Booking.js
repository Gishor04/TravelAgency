import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  age: Number,
  gender: String,
  passportNumber: String
});

const bookingSchema = new mongoose.Schema({
  bookingNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
  selectedDate: { type: Date, required: true },
  travelers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 }
  },
  passengers: [passengerSchema],
  extras: [{
    title: String,
    price: Number
  }],
  couponApplied: {
    code: String,
    discountAmount: { type: Number, default: 0 }
  },
  totalAmount: { type: Number, required: true },
  depositPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 },
  paymentType: { type: String, enum: ['full', 'deposit'], default: 'full' },
  paymentStatus: { type: String, enum: ['pending', 'deposit_paid', 'paid', 'refunded'], default: 'pending' },
  bookingStatus: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, default: 'card' },
  transactionId: String,
  invoiceUrl: String,
  whatsappNotified: { type: Boolean, default: false },
  emailNotified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
