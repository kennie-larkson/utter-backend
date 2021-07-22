import express from "express";

import {
  getResponse,
  storeResponse,
} from "./surveyResController.js";

const surveyResponseRoute = express.Router();

surveyResponseRoute.route("/getresponse").post(getResponse);
surveyResponseRoute.route("/storeresponse").post(storeResponse);

export default surveyResponseRoute;
