import express from "express"
import { createSurvey } from "./surveysController.js"

const router = express.Router()

router.route("/createsurvey").post(createSurvey)

export default router 