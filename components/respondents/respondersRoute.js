import express from "express";

import { responderSignup, getAllResponders } from "./respondersController.js";

const responderRoute = express.Router();

responderRoute.route("/register").post(responderSignup);
responderRoute.route("/responder").get(getAllResponders);

export default responderRoute;
