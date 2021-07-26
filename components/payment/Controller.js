import _ from "lodash";

import Payment from "./Model.js";
import NewReg from "../users/userModel.js";
import { verifyToken } from "../../utils/JWT_HANDLER.js";
import isAuth from "../../middleware/IsAuthmiddleware.js";
import paystack from "./paystack.js";

// paystack()

const updateTheUserWallet = async (userid, amount) => {
  NewReg.updateOne(
    { _id: userid },
    { $inc: { wallet: amount } },
    (err, success) => {
      if (err) return { status: "failed", message: "error :" + err.message };
      else return { status: "success", message: "Wallet Updated Successfully" };
    }
  );
};

export const newPayment = async (req, res) => {
  //
  const { paidBy, amount, paymentID } = req.body;
  // const userID = verifyToken(paidBy);
  // if (userID.err)
  //   return res.status(400).json({ status: "failed", message: userID.err });
  // const userID = isAuth(paidBy);

  const form = _.pick(req.body, ["amount", "email", "fullname"]);
  form.metadata = {
    full_name: form.fullname,
  };
  form.amount *= 100; //to kobo.

  // callback incorrect here, i think i shld be used to verify payment and save to DB.
  paystack().initializePayment(form, (error, body) => {
    if (error) {
      //handle errors
      console.log(error);
      res
        .status(400)
        .json({ status: "failed", message: "Error: " + error.message });
    }

    const response = JSON.parse(body);
    console.log(response.data.authorization_url);
    res.status(200).json({ ...response });
    // res.redirect(response.data.authorization_url);
  });

  // const newPayment = new Payment({ paidBy, amount, paymentID });
  // // its async already.
  // newPayment.save((err, payment) => {
  //   if (err) {
  //     res.status(400).json({ status: "failed" });
  //   } else {
  //     let updateResponse = updateTheUserWallet(userID, amount);
  //     if (updateResponse.status === "failed") {
  //       res
  //         .status(400)
  //         .json({ status: "failed", message: updateResponse.message });
  //     } else {
  //       console.log("Payment successful");
  //       return;
  //       // res
  //       //   .status(200)
  //       //   .json({ status: "success", message: "payment successful" });
  //     }
  //   }
  // });
};

export const verify_Payment = async (req, res) => {
  const ref = req.query.reference;
  paystack().verifyPayment(ref, (error, body) => {
    if (error) {
      //handle errors appropriately
      console.log(error);
      return res.redirect("/error");
    }
    response = JSON.parse(body);
    const data = _.at(response.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.full_name",
    ]);
    [reference, amount, email, full_name] = data;
    newDonor = { reference, amount, email, full_name };
    const donor = new Payment(newDonor);
    donor
      .save()
      .then((donor) => {
        if (donor) {
          res.redirect("/receipt/" + donor._id);
        }
      })
      .catch((e) => {
        res.redirect("/error");
      });
  });
};
