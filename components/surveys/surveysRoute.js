import express from "express";
import createSurvey, { mySurveys  , singleSurvey} from "./surveysController.js";

const router = express.Router();

router.route("/createsurvey").post(createSurvey);
router.route("/mysurveys").post(mySurveys);
router.route("/singlesurvey").post(singleSurvey);

export default router;
