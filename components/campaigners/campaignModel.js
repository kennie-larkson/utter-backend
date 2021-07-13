import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  campaigns: {
    type: Array,
  },
});


const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
