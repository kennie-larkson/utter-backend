import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import passport from "passport"
import dotenv from "dotenv";
dotenv.config()
const uri = process.env.USER_DB_URI;

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
    enum: ["user","campaign responder", "campaign creator"],
    default: "user"
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  
  responder: {
    type: mongoose.Schema.Types.ObjectId, ref: "Responder"
  }

},
{timestamps: true},
);


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db_con = mongoose.connection;

db_con.once("open", function () {
  console.log(`Connection established to ${uri}`);
});

db_con.on("error", function (err) {
  console.log(`Mongoose connection error: ${err}`);
})

db_con.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  db_con.close(function () {
      console.log('Mongoose disconnected through app termination');
  });
  process.exit(0);
});

basicRegSchema.plugin(passportLocalMongoose, {usernameField: "email"});
const NewReg = mongoose.model("NewReg", basicRegSchema);


export default NewReg;
