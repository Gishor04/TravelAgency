import express from 'express';
import { handleChat, generateItinerary } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', handleChat);
router.post('/plan-trip', generateItinerary);

export default router;
