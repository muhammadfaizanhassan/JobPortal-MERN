import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getUsers, getCompanies, getJobs, getApplications } from '../controllers/adminController.js';

const router = express.Router();

// All routes protected by Admin check
router.get('/users', protect, isAdmin, getUsers);
router.get('/companies', protect, isAdmin, getCompanies);
router.get('/jobs', protect, isAdmin, getJobs);
router.get('/applications', protect, isAdmin, getApplications);

export default router;
