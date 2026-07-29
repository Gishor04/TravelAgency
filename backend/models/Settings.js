import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'Globevia Travel 2026' },
  logoUrl: { type: String, default: '/logo.png' },
  contactEmail: { type: String, default: 'concierge@globeviatravel.com' },
  contactPhone: { type: String, default: '+1 (800) 987-6543' },
  whatsappNumber: { type: String, default: '+94 77 123 4567' },
  officeAddress: { type: String, default: '777 Luxury Boulevard, Financial District' },
  registrationNo: { type: String, default: 'REG-2026-GLB-9981' },
  travelLicense: { type: String, default: 'TA-LIC-88271' },
  iataNo: { type: String, default: 'IATA-09281726' },
  currencies: { type: Array, default: ['USD', 'EUR', 'LKR', 'INR', 'GBP'] },
  languages: { type: Array, default: ['en', 'ta', 'si'] }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
