import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
  response: [
    {
      type: String,
    },
  ],
  survey: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
  }],
  responder: { type: mongoose.Schema.Types.ObjectId, ref: "Responder" },
});

const surveyResponse = new mongoose.model("surveyResponse", responseSchema);

export default surveyResponse;
