import mongoose from "mongoose";

const responderSchema = new mongoose.Schema({
  fullname: {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  phonenumber: { type: Number, required: true },
  gender: { type: String, required: true },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  devices: {
    type: String,
    enum: ["Mobile Phone", "Tablet", "Laptop", "Computer"],
  },
  hobbies: { type: String },
  relationship: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widow", "Widower"],
  },
  languages: { type: String },
  skills: { type: String },
  socialmedia: { type: String },
  yearly_income: { type: String },
});

const Responder = mongoose.model("Responder", responderSchema);

export default Responder;
