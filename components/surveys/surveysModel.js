import mongoose from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: { type: Array, required: true },
    campaigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaigner",
    },
  },
  { timestamps: true }
);

surveySchema.plugin(URLSlugs('title', { field: 'slug'}));
const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
