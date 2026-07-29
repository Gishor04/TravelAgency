import mongoose from 'mongoose';

const itineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [String],
  meals: [String],
  accommodation: String
});

const tourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, index: true }, // Domestic, International, Honeymoon, Luxury, etc.
  destination: { type: String, required: true, index: true }, // e.g. "Bali, Indonesia"
  country: { type: String, required: true, index: true },
  city: { type: String, required: true },
  price: { type: Number, required: true }, // in USD
  discountPrice: { type: Number, default: 0 },
  durationDays: { type: Number, required: true },
  durationNights: { type: Number, required: true },
  maxGroupSize: { type: Number, default: 12 },
  availableDates: [Date],
  departureAirport: { type: String, default: 'Colombo (CMB)' },
  tourType: { type: String, default: 'Guided Tour' },
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  hotelDetails: {
    name: String,
    rating: Number,
    roomType: String,
    amenities: [String]
  },
  flightDetails: {
    airline: String,
    included: { type: Boolean, default: true },
    class: { type: String, default: 'Economy' }
  },
  mealPlan: { type: String, default: 'Breakfast Included' },
  images: [String],
  videoUrl: String,
  mapCoordinates: {
    lat: Number,
    lng: Number
  },
  ratings: { type: Number, default: 4.8, min: 1, max: 5 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  seasonalOffer: { type: Boolean, default: false },
  itinerary: [itineraryDaySchema]
}, { timestamps: true });

tourPackageSchema.index({ title: 'text', destination: 'text', country: 'text', category: 'text' });

export default mongoose.models.TourPackage || mongoose.model('TourPackage', tourPackageSchema);
