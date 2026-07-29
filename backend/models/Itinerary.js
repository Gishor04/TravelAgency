import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: { type: String, required: true },
  budget: Number,
  travelersCount: Number,
  durationDays: Number,
  travelDates: String,
  interests: [String],
  travelStyle: String,
  hotelPreference: String,
  generatedPlan: mongoose.Schema.Types.Mixed,
  isSaved: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);
