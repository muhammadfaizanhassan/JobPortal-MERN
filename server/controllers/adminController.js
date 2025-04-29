import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';

// Get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Get all companies
export const getCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

// Get all jobs
export const getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// Get all job applications
export const getApplications = async (req, res) => {
  const applications = await JobApplication.find();
  res.json(applications);
};
