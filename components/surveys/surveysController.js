import Survey from "./surveysModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";
import NewReg from "./../users/userModel.js";
import Responder from "./../respondents/respondersModel.js"

const createSurvey = asyncHandler(async (req, res) => {
  const { id, title, questions, category } = req.body;
  // verifytoken first.
  const tokenResult = verifyToken(id);

  if (tokenResult.err) {
    res.status(400).json({ status: "failed", message: tokenResult.err });
  } else {
    const survey = new Survey({
      title,
      questions,
      createdBy: tokenResult,
      category,
    });

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

export const singleSurvey = asyncHandler(async (req, res) => {
  const { slug } = req.body;
  const survey = await Survey.findOne({ slug: slug }, (err, survey) => {
    if (err) {
      res.status(400).json({ status: "failed", message: err.message });
    } else {
      res.status(201).json({
        status: "success",
        message: "survey fetched successfully",
        survey,
      });
    }
  });
});

export const storeResponse = asyncHandler(async (req, res) => {
  const { id, response } = req.body;
  //checking if the client is logged in with a token
  const tokenResult = verifyToken(id);

  if (tokenResult.err) {
    return res.status(400).json({ status: "Failed, You need to be logged in" });
  }
  //is there a user with the tokenResult as their id?
  // const responder = await NewReg.find({ _id: tokenResult }, (err, user) => {
  //   if (err) {
  //     return res.status(400).json({ status: "failed", message: err.message });
  //   }
  // });
  const responder = await Responder.findOne({user: tokenResult}, (err, responder) => {
    if(err) {
      return res.status(400).json({status: "failed", message: err.message})
    }
  })
  const survey = await Survey.findOne({responder: responder._id})
  if(survey) {
    return res.status(200).json({status: "success", message: "You have taken this survey already"})
  }

  const newResponse = await Survey.create({responses: [response]})
  await newResponse.save()
  if(newResponse) {
    res.status(200).json({status: "success", message: "You survey response has been recorded"})
  }else{
    res.status(400).json({status: "failed", message: err.message})
  }

  // if (responder[0].user_role === "Responder") {
  //   //checking if this user hasn't already taken this survey
  //   console.log("This survey id: ", this.Survey._id);
  //   if (!responder.surveys._id === this.Survey._id) {
  //     const newResponse = new Survey(req.body);
  //     Survey.responses.concat(newResponse).save();
  //   } else {
  //     res
  //       .status(400)
  //       .json({ status: "failed", message: "You already took this survey" });
  //   }
  // } else {
  //   return res.status(400).json({
  //     status: "Failed, You have to be registered as campaign responder",
  //   });
  // }
});

export default createSurvey;
