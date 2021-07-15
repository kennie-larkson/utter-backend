import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoute from "./components/users/userRoute.js";
import responderRoute from "./components/respondents/respondersRoute.js";
import campaignerRoute from "./components/campaigners/campaignersRoute.js";
import surveyRoute from "./components/surveys/surveysRoute.js";
import errorHandler from "./utils/errorHandler.js";
import setCookie from "./utils/setCookies.js"
import getCookies from "./utils/getCookies.js";

dotenv.config();
const app = express();

const secret = process.env.SESSION_SECRET;
app.use(cookieParser(secret));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
 setCookie(res)
 res.status(200).send('Cookie has been set')
});

app.get("/getcookie", (req, res) => {
  getCookies(req, 'name')
res.status(200).send('Session ended')
})

app.get("/logout", (req, res) => {
  res.clearCookie("utter-users");
  res.redirect("/");
  console.log('Cookie cleared')
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/responders", responderRoute);
app.use("/api/v1/campaigners", campaignerRoute);
app.use("/api/v1/surveys", surveyRoute);
app.use(errorHandler);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: `Can't find ${req.originalUrl} on this server `,
  });
});

export default app;
