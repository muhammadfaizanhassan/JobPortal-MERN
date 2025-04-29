// controllers/applicationController.js
import JobApplication from '../models/JobApplication.js';

export const applyForJob = async (req, res) => {
  try {
    // Check if the user has already applied for the job
    const existing = await JobApplication.findOne({
      applicant: req.user._id,
      job: req.params.jobId,
    });

    if (existing) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // Create a new job application
    const application = await JobApplication.create({
      applicant: req.user._id,
      job: req.params.jobId,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error('Application error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ applicant: req.user._id })
      .populate('job')
      .populate('applicant', 'name email'); // Optionally include applicant details
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await JobApplication.find({ job: req.params.jobId })
      .populate('applicant', 'name email'); // Include applicant details
    res.json(applications);
  } catch (err) {
    console.error('Error fetching job applications:', err);
    res.status(500).json({ message: 'Server error' });
  }
};