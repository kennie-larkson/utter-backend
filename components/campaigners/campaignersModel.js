import mongoose from "mongoose";

const campaignerSchema = new mongoose.Schema({
  businessname: { type: String },
  businesswebsite: {
    type: String,
  },
  businessaddress: {
    type: String,
  },
  industry: { type: String },
  employeesize: { type: String },
  targetaudience: {
    type: String,
  },
  campaigns: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewReg",
  },
});

const Campaigner = mongoose.model("Campaigner", campaignerSchema);

export default Campaigner;
