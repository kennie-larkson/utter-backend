import Responder from "./respondersModel.js";
import NewReg from "../users/userModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const createResponder = asyncHandler(async (req, res, next) => {
  const responder = new Responder(req.body);

  if (req.isAuthenticated()) {
    responder.save(function (err, data) {
      if (err) {
        console.log("My error: " + error);
      } else {
        NewReg.findOneAndUpdate(
          { email: req.session.passport.user },
          { user_role: "Responder" },
          { upsert: true, useFindAndModify: false }, function (err, user) {
              if(err) {
                  console.log("Update failed: "+err)
              }else{
                  console.log(user)
              }
          }
        );
        console.log("responder created: " + req.session.passport.user);
        res.status(200).json({
          data: data,
        });
      }
    });
  } else {
    res.send("Please you have to log in");
  }
});

const getAllResponders = asyncHandler(async (req, res, next) => {
  Responder.find(function (err, responder) {
    if (err) {
      console.log(err);
    } else {
      res.json({ responder });
    }
  });
});

export { createResponder, getAllResponders };
