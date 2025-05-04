// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // 👈 ADD this line
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();

// CORS setup
app.use(cors({
  origin: 'https://jobportal-mern-frontend.onrender.com', // Allow frontend access
  credentials: true
}));

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes); // 👈 ADD this new admin route

// Connect DB and start the server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});

// Global error handler
app.use(errorHandler);
