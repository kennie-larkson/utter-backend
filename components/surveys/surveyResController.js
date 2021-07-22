import SurveyResponse from "./surveyResModel.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";
import NewReg from "../users/userModel.js";
import Survey from "./surveysModel.js";

export const storeResponse = async () => {
  const { id } = req.body;
  //checking if the client is logged in with a token
  const tokenResult = verifyToken(id);

  if (tokenResult.err) {
    return res.status(400).json({ status: "Failed, You need to be logged in" });
  }
  //is there a user with the tokenResult as their id?
  const responder = NewReg.find({ _id: tokenResult });
  if (responder && responder.user_role === "campaign responder") {
    //if a user exists with that id are they a campaign responder by user role?
    SurveyResponse.create(req.body, (err, response) => {
      //create and save the response accordingly
      if (err) {
        return res.status(400).json({ status: "failed", message: err.message });
      }
      //save a reference to the survey been responded in the survey response collection
      Survey.find({ createdBy: tokenResult }, (err, survey) => {
        if (err) {
          return res.status(400).json({ status: "Failed, no such survey" });
        }
        response.survey.concat(survey);
      });
      //save the responder in the response collection
      response.responder.concate(responder).save();
      //add this response to the list of responses of the user
      responder.responses.concat(response).save();
      res.status(200).json({
        status: "success",
        response,
        responder,
      });
    });
  } else {
    return res.status(400).json({
      status: "Failed, You are have to be registered as campaign responder",
    });
  }
};

export const getResponse = async () => {
  SurveyResponse.find(req.body.id, (err, response) => {
    if (err) {
      return res.status(400).json({ status: "failed", message: err.message });
    }
    res.status(200).json({ status: "success", response });
  });
};
