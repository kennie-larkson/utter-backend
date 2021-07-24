import mongoose from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const surveySchema = mongoose.Schema(
  {
    title: { type: String,  },
    questions: [{ type: String,  }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewReg",
    },
    responses: [{ type: String }],
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    responders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Responder" }],
  },
  { timestamps: true }
);

surveySchema.plugin(URLSlugs("title", { field: "slug" }));
const Survey = mongoose.model("Survey", surveySchema);


export default Survey;
