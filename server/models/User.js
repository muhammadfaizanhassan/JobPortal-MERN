// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['jobseeker', 'recruiter', 'admin'], default: 'jobseeker' },
  profile: {
    resume: String,
    experience: String,
    skills: [String],
    education: String
  }
}, { timestamps: true });


export default mongoose.model('User', userSchema);
