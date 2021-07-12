import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";
import NewReg from "./userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";
import passport from "passport";

const saltRounds = 10;

//Register new user
const createUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  NewReg.register({ email: email }, password, function (err, newUser) {
    if (err) {
      console.log("error: " + err);
      res.status(400).json({
        status: "failed",
        message: err.message
        // message: "Error registering user, please check details",
      });
    } else {
      passport.authenticate("local")(req, res, function () {
        res.status(200).json({ status: "success" });
      });
    }
  });
});

//For login authentication
const getUserByEmailAndPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const newUser = new NewReg({
    email: email,
    password: password,
  });

  req.login(newUser, function (err) {
    if (err) {
      console.log("My error: " + err);
      res.status(400).json({
        status: "failed",
        message: err.message
      });
    } else {
      console.log(req.session);
      passport.authenticate("local")(req, res, function () {
        res.send("You have been authenticated and session is on");
      });
    }
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {

  await NewReg.find({}, function (err, users) {
    if (err) {
      res.status(400).json({
        status: "failed",
        message: err.message
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
      console.log(`Error: ${err.message}`)
      res.status(400).json({
        status: "failed",
        message: err
      })
    }else {
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
