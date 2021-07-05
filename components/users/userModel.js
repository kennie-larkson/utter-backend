import mongoose from "mongoose";

const basicRegSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
    lowercase: true,
  },

  password: {
    type: String,
    require: true,
  },
});

const NewReg = mongoose.model("NewReg", basicRegSchema);

export default NewReg;
