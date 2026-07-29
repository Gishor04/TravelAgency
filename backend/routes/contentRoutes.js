import express from 'express';
import { getDestinations, getBlogs, getReviews, submitContact, submitVisaRequest, subscribeNewsletter } from '../controllers/contentController.js';

const router = express.Router();

router.get('/destinations', getDestinations);
router.get('/blogs', getBlogs);
router.get('/reviews', getReviews);
router.post('/contact', submitContact);
router.post('/visa-request', submitVisaRequest);
router.post('/newsletter', subscribeNewsletter);

export default router;
