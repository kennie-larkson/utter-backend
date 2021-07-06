import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";

import userRoute from "./components/users/userRoute.js";
import errorHandler from "./utils/errorHandler.js";
import NewReg from "./components/users/userModel.js";

dotenv.config();
const app = express();
const uri = process.env.USER_DB_URI;
const secret = process.env.SESSION_SECRET

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(NewReg.createStrategy());
passport.serializeUser(NewReg.serializeUser());
passport.deserializeUser(NewReg.deserializeUser());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db_con = mongoose.connection;

db_con.once("open", function () {
  console.log(`Connection established to ${uri}`);
});

app.get("/", (req, res) => {
  res.send("Hey! the UtterUsers server is live...");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/secret", (req, res) => {
  if(req.isAuthenticated()){
    res.send("Here is the secret")
  }else {
    res.redirect("/")
  }
})

app.use("/api/v1/users", userRoute);
app.use(errorHandler);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: `Can't find ${req.originalUrl} on this server `,
  });
});

export default app;
