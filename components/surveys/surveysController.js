import Survey from "./surveysModel.js";
import NewReg from "../users/userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";

const createSurvey = asyncHandler( async (req, res, next) => {
    const survey = new Survey(req.body)

    if(req.isAuthenticated()) {
        survey.save(function (err, newsurvey) {
            if(err) {
                console.log("Survey not created: "+err);
                res.send("Survey not created: "+err)
            }else {
                res.status(200).json({
                    status: "success",
                    message: "Your survey has been created"
                })
            }
        })
    }else {
        console.log("You need to be logged in");
        res.json({message: "You need to be logged in"})
    }
})

 export {createSurvey}