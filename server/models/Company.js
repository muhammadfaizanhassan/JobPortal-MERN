// models/Company.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: String,
  description: String,
  website: String,
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
