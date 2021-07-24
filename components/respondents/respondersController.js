import Responder from "./respondersModel.js";
import NewReg from "../users/userModel.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";

const responderSignup = asyncHandler(async (req, res, next) => {
  const responder = new Responder(req.body);
  //the id is the jwt signed token received when user registers or logs in and it will be passed in the body of this request
  const tokenResult = verifyToken(req.body.id); 

  if (tokenResult.err) {
    res.status(400).json({ status: "failed", message: tokenResult.err });
  } else {
    // using the verified token (user._id) to know which user upgraded to a responder role
    responder.user = tokenResult; 
    responder.save(function (err, data) {
      if (err) {
        res.status(400).json({ status: "failed", message: err.message });
      } else {
        NewReg.findOneAndUpdate(
          { _id: tokenResult },
          //the role of the user is changed from "user" to "Responder"
          { user_role: "Responder" }, 
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

export { responderSignup, getAllResponders };
