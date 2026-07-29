import mongoose from 'mongoose';

const visaRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  passportNumber: { type: String, required: true },
  travelDate: { type: Date, required: true },
  visaType: { type: String, default: 'Tourist' },
  status: { type: String, enum: ['pending', 'reviewing', 'approved', 'rejected'], default: 'pending' },
  notes: String
}, { timestamps: true });

export default mongoose.models.VisaRequest || mongoose.model('VisaRequest', visaRequestSchema);
