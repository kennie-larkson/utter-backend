import bcrypt from "bcrypt";
import NewReg from "./userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";

import setCookies from "./../../utils/setCookies.js";
import getCookies from "./../../utils/getCookies.js";

const saltRounds = 10;

//Register new user
const createUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = new NewReg({ email, password });
  // save the user to database
  user.save(function (err, user) {
    if (err) {
      res.status(400).json({status: "failed", message: err.message})
    }else {
      setCookies(res, user._id)
      res.status(200).json({
        status: "success",
        message: "Your session is active and cookie has been set"
      })
    }

  });

 
});

//For login authentication
const getUserByEmailAndPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

   // fetch the user and test password verification
NewReg.findOne({ email: email }, function(err, user) {
  if (err) {
    res.status(400).json({status: "failed", message: err.message})
    return 
  }else {
    // test a matching password
  user.comparePassword(res, password, function(err, isMatch) {
    if (err) {
      console.log(`Error comparing pword: ${err.message}`);
      res.status(400).json({message: 'Error comparing password'})
      return 
    }else {
      if( getCookies(req, "_id") === undefined ) {
        setCookies(res, user._id)
        res.status(200).json({status: "success", message: "User authenticated and a new session has been set"})
      }else {
        res.status(200).json({status: "success", message: "User authenticated and has a running session"})
      }
    }
    console.log(password, isMatch); // -&gt; Password123: true

   
});
  }
   
});
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  await NewReg.find({}, function (err, users) {
    if (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: users,
      });
    }
  });
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await NewReg.findById(id, function (err, user) {
    if (err) {
      console.log(`Error: ${err.message}`);
      res.status(400).json({
        status: "failed",
        message: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { user },
      });
    }
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    body: { email, password },
  } = req;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    NewReg.findByIdAndUpdate(
      id,
      { email: email, password: hash },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
      function (err, user) {
        res.status(200).json({
          status: "success",
          data: user,
        });
      }
    );
  });
});

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  getUserByEmailAndPassword,
};
