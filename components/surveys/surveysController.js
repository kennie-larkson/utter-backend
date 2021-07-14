import Survey from "./surveysModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";

const createSurvey = asyncHandler(async (req, res, next) => {
  const survey = new Survey(req.body);

  if (req.isAuthenticated()) {
    console.log(req.session);
    survey.createdBy = await NewReg.findOne({
      email: req.session.passport.user,
    });
    survey.save(function (err, newsurvey) {
      if (err) {
        console.log("Survey not created: " + err);
        res.send("Survey not created: " + err);
      } else {
        res.status(200).json({
          status: "success",
          message: "Your survey has been created",
          data: newsurvey,
        });
      }
    });
  } else {
    console.log("You need to be logged in");
    res.json({ message: "You need to be logged in" });
  }
});

export default createSurvey;
