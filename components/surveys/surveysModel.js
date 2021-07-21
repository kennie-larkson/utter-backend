import mongoose from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const surveySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: { type: Array, required: true },
    createdBy: String,
    category: String
  },
  { timestamps: true }
);

surveySchema.plugin(URLSlugs("title", { field: "slug" }));
const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
