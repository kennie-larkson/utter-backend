import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import passport from "passport"
import dotenv from "dotenv";
dotenv.config()
// const uri = process.env.USER_DB_URI;

const basicRegSchema = mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
    lowercase: true,
  },
  password: {
    type: String,
    // required: true,
  },
  user_role: {
    type: String,
    enum: ["user","Responder", "Creator"],
    default: "user"
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  campaigns: {type: mongoose.Schema.Types.ObjectId, ref: "Campaign"}, //user campaigns be it as a creator or responder
  responder: {
    type: mongoose.Schema.Types.ObjectId, ref: "Responder"
  },
  responses: {
    type: mongoose.Schema.Types.ObjectId, ref: "surveyResponse" //user responses should user be a responder
  }

},
{timestamps: true},
);



basicRegSchema.plugin(passportLocalMongoose, {usernameField: "email" });
// basicRegSchema.plugin(passportLocalMongoose );



// basicRegSchema.plugin(passportLocalMongoose, {usernameField: "_id", usernameQueryFields: ["_id"]});
const NewReg = mongoose.model("NewReg", basicRegSchema);
passport.use(NewReg.createStrategy());
passport.serializeUser( function(user, done) {
  done(null, user.id)
});
passport.deserializeUser(function(id, done) {
  NewReg.findById(id, function(err, user) {
    done(err, user);
  });
});


export default NewReg;
