import Survey from "./surveysModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";
import NewReg from "./../users/userModel.js";
import Responder from "./../respondents/respondersModel.js";

const createSurvey = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    questions,
    category,
    type,
    expectedAmtOfResponses,
    emailLog,
  } = req.body;
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
      type,
      expectedAmtOfResponses,
      emailLog,
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

  //Has the user registered as a responder?
  const responder = await Responder.findOne(
    { user: tokenResult },
    (err, responder) => {
      if (err) {
        return res.status(400).json({ status: "failed", message: err.message });
      }
    }
  );

  //check if this Responder has taken this survey already?
  const surveyResponder = await Survey.findOne({ responders: tokenResult });
  // console.log(surveyResponder)
  if (surveyResponder) {
    return res.status(200).json({
      status: "success",
      message: "You have taken this survey already",
    });
  }

  //store the response in the list of responses and save
  const newResponse = await Survey.create({
    responses: [response],
    responders: [tokenResult],
  });
  await newResponse.save();
  if (newResponse) {
    res.status(200).json({
      status: "success",
      message: "You survey response has been recorded",
    });
  } else {
    res.status(400).json({ status: "failed", message: err.message });
  }
});

export default createSurvey;
