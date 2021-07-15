import mongoose from "mongoose";
import bcrypt from "bcrypt"
import dotenv from "dotenv";

dotenv.config()

const uri = process.env.USER_DB_URI;
const SALT_WORK_FACTOR = 10

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
    required: true,
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
  campaigns: {type: mongoose.Schema.Types.ObjectId, ref: "Campaign"},
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


basicRegSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

    
basicRegSchema.methods.comparePassword = function(res, candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
     
      if(err) return console.log(`Compare error : ${err}`);
      if(isMatch === false) { console.log(`Password mismatch`)
      // console.log(this.password);
        res.status(400).json({status: "failed", message: "Wrong password"})
        
        return
    };
      cb(null, isMatch);
  });
};
   
const NewReg = mongoose.model("NewReg", basicRegSchema);


export default NewReg;
