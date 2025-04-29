// controllers/jobController.js
import Job from '../models/Job.js';
import User from '../models/User.js';

//
// ➤ Create a new job (recruiters only)
//
export const createJob = async (req, res) => {
  try {
    // 1) Destructure incoming form data
    const { title, description, location, salary, type, company } = req.body;

    // 2) Fetch the full user record to check role & get name
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters may create jobs' });
    }

    // 3) Build the job document
    const job = new Job({
      title,
      description,
      location,
      salary,
      type,
      company,      // freeform string
      postedBy: {   // embed both _id and name
        id:   user._id,
        name: user.name,
      },
    });

    // 4) Save & respond
    await job.save();
    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Server error while creating job' });
  }
};

//
// ➤ List ALL jobs
//
export const getAllJobs = async (req, res) => {
  try {
    // No populate on company (just a string); postedBy is embedded
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Server error while fetching jobs' });
  }
};

//
// ➤ Get one job by ID
//
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: 'Server error while fetching job details' });
  }
};
