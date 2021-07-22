import express from "express"
import createSurvey  from "./surveysController.js"

const surveyRoute = express.Router()

surveyRoute.route("/createsurvey").post(createSurvey)

export default surveyRoute 