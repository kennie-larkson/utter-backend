import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  campaigns: [{
    type: {},
  }],
});


const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
