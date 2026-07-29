import express from 'express';
import { createBooking, getMyBookings, getBookingById } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createBooking); // Accessible for guest or logged in
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', getBookingById);

export default router;
