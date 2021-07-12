import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: { type: Array, required: true },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
