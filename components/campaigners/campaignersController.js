import Campaigner from "./campaignersModel.js";
import NewReg from "../users/userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";

const createCampaigner = asyncHandler(async (req, res, next) => {
  //   const {
  //     businessname,
  //     businesswebsite,
  //     businessaddress,
  //     industry,
  //     employeesize,
  //     targetaudience,
  //   } = req.body;
  const campaigner = new Campaigner(req.body);

  if (req.isAuthenticated()) {
    campaigner.save(function (err, data) {
      if (err) {
        console.log("Couldn't create campaigner: " + err);
      } else {
        NewReg.findOneAndUpdate(
          { email: req.session.passport.user },
          { user_role: "Campaigner" },
          { upsert: true, useFindAndModify: false },
          function (err, user) {
            if (err) {
              console.log("Update failed: " + err);
            } else {
              console.log(user);
            }
          }
        );
        res.status(200).json({ data: data });
      }
    });
  } else {
    console.log("Please you have to log in");
    res.json({ message: "Please you have to log in" });
  }
});

export { createCampaigner };
