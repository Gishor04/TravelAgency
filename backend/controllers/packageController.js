import TourPackage from '../models/TourPackage.js';
import { MOCK_PACKAGES } from '../utils/mockData.js';

export const getPackages = async (req, res) => {
  try {
    const { category, country, tourType, minPrice, maxPrice, search, featured, trending, seasonal } = req.query;

    let filter = {};
    if (category) filter.category = new RegExp(category, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (tourType) filter.tourType = new RegExp(tourType, 'i');
    if (featured) filter.featured = featured === 'true';
    if (trending) filter.trending = trending === 'true';
    if (seasonal) filter.seasonalOffer = seasonal === 'true';

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { destination: new RegExp(search, 'i') },
        { country: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') }
      ];
    }

    let packages = [];
    try {
      packages = await TourPackage.find(filter).sort({ createdAt: -1 });
    } catch (e) {
      packages = [];
    }

    if (!packages || packages.length === 0) {
      // Return filtered mock packages
      packages = MOCK_PACKAGES.filter(p => {
        if (category && !p.category.toLowerCase().includes(category.toLowerCase())) return false;
        if (country && !p.country.toLowerCase().includes(country.toLowerCase())) return false;
        if (tourType && !p.tourType.toLowerCase().includes(tourType.toLowerCase())) return false;
        if (featured === 'true' && !p.featured) return false;
        if (trending === 'true' && !p.trending) return false;
        if (seasonal === 'true' && !p.seasonalOffer) return false;
        if (minPrice && p.price < Number(minPrice)) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        if (search) {
          const q = search.toLowerCase();
          const match = p.title.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      });
    }

    res.json({
      success: true,
      count: packages.length,
      packages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPackageBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;
    let tourPackage;

    try {
      tourPackage = await TourPackage.findOne({
        $or: [{ slug: identifier }, { _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null }]
      });
    } catch (e) {
      tourPackage = null;
    }

    if (!tourPackage) {
      tourPackage = MOCK_PACKAGES.find(p => p.slug === identifier || p._id === identifier);
    }

    if (!tourPackage) {
      return res.status(404).json({ success: false, message: 'Tour Package not found' });
    }

    res.json({ success: true, package: tourPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const tourPackage = await TourPackage.create(req.body);
    res.status(201).json({ success: true, package: tourPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const tourPackage = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tourPackage) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, package: tourPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    await TourPackage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
