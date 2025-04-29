// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  type: { type: String, enum: ['full-time', 'part-time', 'internship'] },
  salary: String,

  // Store the poster’s user ID, but also embed their name
  postedBy: {
    id:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
  },

  // Now just a freeform string
  company: String,
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
