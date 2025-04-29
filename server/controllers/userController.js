// controllers/userController.js
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Get data from req.body
    const { experience, education, skills } = req.body;

    // Update nested profile fields
    user.profile.experience = experience;
    user.profile.education = education;

    if (skills) {
      user.profile.skills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;
    }

    // Handle file upload (resume)
    if (req.file) {
      user.profile.resume = `/uploads/${req.file.filename}`;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
