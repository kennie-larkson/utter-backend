import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import passport from "passport"

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
  user_role: {
    type: String,
    enum: ["user","campaign responder", "campaigner creator"],
    default: "user"
  },
  createOn: {
    type: Date,
    default: Date.now()
  },

  responder: {
    type: mongoose.Schema.Types.ObjectId, ref: "Responder"
  }

});

basicRegSchema.plugin(passportLocalMongoose, {usernameField: "email"});
const NewReg = mongoose.model("NewReg", basicRegSchema);


export default NewReg;
