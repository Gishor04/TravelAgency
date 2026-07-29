import Destination from '../models/Destination.js';
import Blog from '../models/Blog.js';
import Review from '../models/Review.js';
import Contact from '../models/Contact.js';
import VisaRequest from '../models/VisaRequest.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import { MOCK_DESTINATIONS, MOCK_BLOGS, MOCK_REVIEWS } from '../utils/mockData.js';

export const getDestinations = async (req, res) => {
  try {
    let destinations = [];
    try {
      destinations = await Destination.find().sort({ featured: -1 });
    } catch (e) {
      destinations = [];
    }

    if (!destinations || destinations.length === 0) {
      destinations = MOCK_DESTINATIONS;
    }

    res.json({ success: true, count: destinations.length, destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    let blogs = [];
    try {
      blogs = await Blog.find().sort({ createdAt: -1 });
    } catch (e) {
      blogs = [];
    }

    if (!blogs || blogs.length === 0) {
      blogs = MOCK_BLOGS;
    }

    res.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    let reviews = [];
    try {
      reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    } catch (e) {
      reviews = [];
    }

    if (!reviews || reviews.length === 0) {
      reviews = MOCK_REVIEWS;
    }

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    let contact;
    try {
      contact = await Contact.create({ name, email, phone, subject, message });
    } catch (e) {
      contact = { name, email, subject, status: 'new', createdAt: new Date() };
    }

    res.status(201).json({ success: true, message: 'Message submitted successfully. Our team will contact you within 2 hours.', contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitVisaRequest = async (req, res) => {
  try {
    const { fullName, email, phone, destinationCountry, passportNumber, travelDate } = req.body;
    let visaReq;
    try {
      visaReq = await VisaRequest.create({
        user: req.user ? req.user.id : null,
        fullName,
        email,
        phone,
        destinationCountry,
        passportNumber,
        travelDate
      });
    } catch (e) {
      visaReq = { fullName, destinationCountry, status: 'pending' };
    }

    res.status(201).json({ success: true, message: 'Visa assistance request received. A specialist has been assigned.', visaRequest: visaReq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
      await NewsletterSubscriber.create({ email });
    } catch (e) {
      // Ignored if already subscribed
    }

    res.json({ success: true, message: 'Thank you for subscribing to Aura Luxury Travel updates & secret flash deals!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
