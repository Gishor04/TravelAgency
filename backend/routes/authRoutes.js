import express from 'express';
import { registerUser, loginUser, adminLogin, getMe } from '../controllers/authController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin-login', adminLogin);
router.get('/me', optionalAuth, getMe);

export default router;
