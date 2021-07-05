import mongoose from "mongoose";

const campaignerSchema = new mongoose.Schema({
  business_name: { type: String, required: true },
  business_website: { type: String, required: true },
  business_address: { type: String, required: true },
  industry: { type: String, required: true },
  employee_size: { type: String, required: true },
  target_audience: { type: String, required: true },
});

const surveySchema = new mongoose.Schema({
  title: { type: String },
  question: { type: String },
  timestamps: true
});

export const Survey = mongoose.model("Survey", surveySchema);
const Campaigner = mongoose.model("Campaigner", campaignerSchema);

export default Campaigner;
