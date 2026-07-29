import express from 'express';
import { getAdminStats, getAllBookingsAdmin, updateBookingStatusAdmin, deleteBookingAdmin } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', getAdminStats);
router.get('/bookings', getAllBookingsAdmin);
router.put('/bookings/:id/status', updateBookingStatusAdmin);
router.delete('/bookings/:id', deleteBookingAdmin);

export default router;
