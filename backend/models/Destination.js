import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, index: true },
  region: { type: String, default: 'Asia' },
  coverImage: { type: String, required: true },
  gallery: [String],
  description: { type: String, required: true },
  popularAttractions: [String],
  weatherInfo: {
    averageTemp: String,
    bestSeason: String,
    climate: String
  },
  bestTimeToVisit: { type: String, default: 'October to April' },
  featured: { type: Boolean, default: false },
  tourCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
