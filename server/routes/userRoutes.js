// routes/userRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getAllUsers, getProfile, updateProfile } from '../controllers/userController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', protect, isAdmin, getAllUsers);
router.get('/me', protect, getProfile);
router.put('/me', protect,upload.single('resume'), updateProfile);

export default router;
