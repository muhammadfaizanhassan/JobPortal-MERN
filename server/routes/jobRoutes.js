// routes/jobRoutes.js
import express from 'express';
import { protect, isRecruiter } from '../middleware/authMiddleware.js'; // Import protect and isRecruiter middleware
import { createJob, getAllJobs, getJob } from '../controllers/jobController.js';

const router = express.Router();

// Route to create a job - Only recruiters can create jobs
router.post('/', protect, isRecruiter, createJob); // Only recruiters can post

// Route to get all jobs
router.get('/', getAllJobs);

// Route to get a job by ID
router.get('/:id', getJob);

export default router;
