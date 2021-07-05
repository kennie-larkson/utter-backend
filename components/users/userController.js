import bcrypt from "bcrypt";
import NewReg from "./userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";

const saltRounds = 10;

//Register new user
const createUser = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  const user = await NewReg.findOne({ email: req.body.email });
  if (user) {
    res
      .status(200)
      .json({ message: "A user already exists with that email. try another" });
  } else {
    if (password.length < 6) {
      console.log('Password is too short')
      res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const newUser = NewReg({
          email: req.body.email,
          password: hash,
        });

        newUser.save(function (err) {
          if (err) {
            console.log("there's an error");
            res
              .status(400)
              .json({ success: false, message: "Enter a real email" });
          } else {
            res.status(201).json({
              status: "success",
              data: newUser,
            });
          }
        });
      });
    }
  }
});

//For login authentication
const getUserByEmailAndPassword = asyncHandler(async (req, res, next) => {
  
  const { email, password } = req.body;

  NewReg.findOne({email: email}, function(err, foundUser){
    if (err) {
      console.log(err);
      res.status(400).json({status: "failed", message: "User does not exist"})
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if (result === true) {
            res.status(200).json({
              status: "success",
              data: foundUser
            })
          }else {
            res.status(400).json({status: "failed", message: "Passwords don't match"})
          }
        });
      }
    }
  });

});


const getAllUsers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const users = await NewReg.find({})
    .skip(limit * page - limit)
    .limit(limit * 1);

  res.status(200).json({
    status: "success",
    per_page: limit,
    data: { users },
  });
});


const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  const user = await NewReg.findById(id);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    body: {email, password},
  } = req;

   bcrypt.hash(password, saltRounds, function (err, hash) {
    
      NewReg.findByIdAndUpdate(id, {email: email, password: hash}, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }, function (err, user) {
        res.status(200).json({
          status: "success",
          data: user
        })
      });
      
  
  })
 
});

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  getUserByEmailAndPassword,
};
