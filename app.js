import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session, { Cookie } from "express-session";
import passport from "passport";
import mongoose from "mongoose";

// import connect from "./utils/database.js";
import userRoute from "./components/users/userRoute.js";
import responderRoute from "./components/respondents/respondersRoute.js";
import campaignerRoute from "./components/campaigners/campaignersRoute.js";
import surveyRoute from "./components/surveys/surveysRoute.js";
import surveyResponseRoute from "./components/surveys/surveyResRoute.js";
import errorHandler from "./utils/errorHandler.js";
import NewReg from "./components/users/userModel.js";

dotenv.config();
const app = express();
const secret = process.env.SESSION_SECRET;
const url = process.env.CORS_ORIGIN;
const uri = process.env.USER_DB_URI;

app.use(
  cors({
    origin: url,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", url);
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    // maxAge: new Date(Date.now() + 30 * 86400 * 1000),
    maxAge: 1800,
    sameSite: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connect to database
// connect();

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db_con = mongoose.connection;

db_con.once("open", function () {
  console.log(`Connection established to ${uri}`);
});

db_con.on("error", function (err) {
  console.log(`Mongoose connection error: ${err}`);
})

db_con.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  db_con.close(function () {
      console.log('Mongoose disconnected through app termination');
  });
  process.exit(0);
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.get("/", (req, res) => {
  res.send("Hey! the UtterUsers server is live...");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// app.get("/secret", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send("Here is the secret");
//   } else {
//     res.redirect("/");
//   }
// });

app.use("/api/v1/users", userRoute);
app.use("/api/v1/responders", responderRoute);
app.use("/api/v1/campaigners", campaignerRoute);
app.use("/api/v1/surveys", surveyRoute);
app.use("/api/v1/surveyresponse", surveyResponseRoute);
app.use(errorHandler);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: `Can't find ${req.originalUrl} on this server `,
  });
});

export default app;
