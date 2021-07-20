import Responder from "./respondersModel.js";
import NewReg from "../users/userModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";

const createResponder = asyncHandler(async (req, res, next) => {
  const responder = new Responder(req.body);
  const tokenResult = verifyToken(req.body.id); //the id is the jwt signed token received when user registers or logs in and it will be passed in the body of this request

  if (tokenResult.err) {
    res.status(400).json({ status: "failed", message: tokenResult.err });
  } else {
    responder.user = tokenResult; // using the verified token (user._id) to know which user upgraded to a responder role
    responder.save(function (err, data) {
      if (err) {
        res.status(400).json({ status: "failed", message: err.message });
      } else {
        NewReg.findOneAndUpdate(
          { _id: tokenResult },
          { user_role: "Responder" }, //the role of the user is changed from "user" to "Responder"
          { upsert: true, useFindAndModify: false },
          function (err, user) {
            if (err) {
              res.status(400).json({ status: "update failed: " + err.message });
            } else {
              res.status(200).json({
                status: "success",
                message: "Responders created and user data updated",
              });
            }
          }
        );
      }
    });
  }
  // if (req.isAuthenticated()) {
  //   responder.save(function (err, data) {
  //     if (err) {
  //       console.log("My error: " + error);
  //     } else {
  //       NewReg.findOneAndUpdate(
  //         { email: req.session.passport.user },
  //         { user_role: "Responder" },
  //         { upsert: true, useFindAndModify: false }, function (err, user) {
  //             if(err) {
  //                 console.log("Update failed: "+err)
  //             }else{
  //                 console.log(user)
  //             }
  //         }
  //       );
  //       console.log("responder created: " + req.session.passport.user);
  //       res.status(200).json({
  //         data: data,
  //       });
  //     }
  //   });
  // } else {
  //   res.send("Please you have to log in");
  // }
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
