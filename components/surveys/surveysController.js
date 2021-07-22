import Survey from "./surveysModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";
import NewReg from "./../users/userModel.js";

const createSurvey = asyncHandler(async (req, res) => {
  const { id, title, questions, category } = req.body;
  // verifytoken first.
  const tokenResult = verifyToken(id);

  if (tokenResult.err) {
    res.status(400).json({ status: "failed", message: tokenResult.err });
  } else {
    const survey = new Survey({ title, questions, createdBy: tokenResult, category });

    survey.save(function (err, newsurvey) {
      if (err) {
        console.log("Survey not created: " + err);
        res.send("Survey not created: " + err);
      } else {
        res.status(200).json({
          status: "success",
          message: "Your survey has been created",
          data: newsurvey,
        });
      }
    });
  }

  // if (req.isAuthenticated()) {
  //   Survey.createdBy = await NewReg.findOne({
  //     email: req.session.passport.user,
  //   });
  //   Survey.save(function (err, newsurvey) {
  //     if (err) {
  //       console.log("Survey not created: " + err);
  //       res.send("Survey not created: " + err);
  //     } else {
  //       res.status(200).json({
  //         status: "success",
  //         message: "Your survey has been created",
  //         data: newsurvey,
  //       });
  //     }
  //   });
  // } else {
  //   console.log("You need to be logged in");
  //   res.json({ message: "You need to be logged in" });
  // }
});

export const mySurveys = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const tokenResult = verifyToken(token);
  if (tokenResult.err) {
    res.status(400).json({ status: "failed", message: tokenResult.err });
    return;
  }

  await Survey.find({ createdBy: tokenResult }, (err, surveys) => {
    err
      ? res
          .status(400)
          .json({ status: "failed", message: "Error : " + err.message })
      : res.status(200).json({
          status: "success",
          message: "Surveys Pulled",
          surveys,
        });
  });
});

export const singleSurvey = asyncHandler(async(req, res)=>{
  const { slug } = req.body;
  const survey = await Survey.findOne({slug: slug}, (err, survey)=>{
    if(err){
      res.status(400).json({status: "failed", message : err.message});
    } else{
      res.status(201).json({status : "success", message : "survey fetched successfully", survey});
    }
  })
})

export default createSurvey;
