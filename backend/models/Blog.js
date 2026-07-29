import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, default: 'Luxury Travel Editorial' },
  category: { type: String, required: true, index: true }, // Visa Guides, Travel Tips, Packing Guides, etc.
  tags: [String],
  coverImage: { type: String, required: true },
  content: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  seoMeta: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
