// routes/applicationRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { applyForJob, getMyApplications, getApplicationsByJob } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/apply/:jobId', protect, applyForJob);
router.get('/me', protect, getMyApplications);
router.get('/job/:jobId', protect, getApplicationsByJob);

export default router;
