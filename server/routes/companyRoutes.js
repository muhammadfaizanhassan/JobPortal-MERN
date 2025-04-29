// routes/companyRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createCompany, getAllCompanies, getCompany } from '../controllers/companyController.js';

const router = express.Router();

router.post('/', protect, createCompany);
router.get('/', getAllCompanies);
router.get('/:id', getCompany);

export default router;
