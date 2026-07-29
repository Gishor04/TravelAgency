import express from 'express';
import { createBooking, getMyBookings, getBookingById } from '../controllers/bookingController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', optionalAuth, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', getBookingById);

export default router;
