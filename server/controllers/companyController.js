// controllers/companyController.js
import Company from '../models/Company.js';

export const createCompany = async (req, res) => {
  const company = await Company.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(company);
};

export const getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

export const getCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.json(company);
};
