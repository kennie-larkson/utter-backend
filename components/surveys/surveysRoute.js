import express from "express";
import createSurvey, { mySurveys } from "./surveysController.js";

const router = express.Router();

router.route("/createsurvey").post(createSurvey);
router.route("/mysurveys").post(mySurveys);

export default router;
