import express from "express";

import { createCampaigner } from "./campaignersController.js";
const router = express.Router();

router.route("/register").post(createCampaigner);

export default router;
