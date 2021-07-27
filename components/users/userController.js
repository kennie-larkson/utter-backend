import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";
import NewReg from "./userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";
import passport from "passport";
import { createToken, verifyToken } from "./../../utils/JWT_HANDLER.js";
import isAuth from "../../middleware/IsAuthmiddleware.js";

const saltRounds = 10;

//Register new user
const createUser = asyncHandler(async (req, res, next) => {
  // const { email, password } = req.body;

  NewReg.register(
    new NewReg({ email: req.body.email }),
    req.body.password,
    function (err, newUser) {
      if (err) {
        console.log(`oops : ${err.message}`);
        res.status(400).json({ message: err.message });
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("user has been created and stored", newUser._id);

          res.status(200).json({
            status: "success",
            message: "User successfully registered",
            data: newUser._id,
          });
        });
      }
    }
  );
});

//For login authentication
const getUserByEmailAndPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //sets the storage.
  // const newUser = new NewReg({
  //   email: email,
  //   password: password,
  // });
  const newUser = NewReg({
    email: email,
    password: password,
  });

  req.login(newUser, function (err) {
    if (err) {
      console.log(`login error: ${err.message}`);
      res.status(400).json({ message: `login error : ${err.message}` });
    } else {
      passport.authenticate("local")(req, res, function () {
        // use jwt here!
        const userid = createToken(newUser._id);
        console.log(userid);
        console.log("user logged in and authenticated");
        res.status(200).json({
          status: "success",
          message: "user logged in and authenticated",
          hash: userid,
        });
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
