import express from 'express';
import { getPackages, getPackageBySlugOrId, createPackage, updatePackage, deletePackage } from '../controllers/packageController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/:identifier', getPackageBySlugOrId);
router.post('/', protect, authorize('admin'), createPackage);
router.put('/:id', protect, authorize('admin'), updatePackage);
router.delete('/:id', protect, authorize('admin'), deletePackage);

export default router;
