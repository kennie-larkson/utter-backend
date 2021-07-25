import Payment from "./Model";
import NewReg from "../users/userModel";
import { verifyToken } from "../../utils/JWT_HANDLER";

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
  const [paidBy, amount, paymentID] = req.body;
  const userID = verifyToken(paidBy);
  if (userID.err)
    return res.status(400).json({ status: "failed", message: userID.err });
  const newPayment = new Payment({ paidBy, amount, paymentID });
  // its async already.
  newPayment.save((err, payment) => {
    if (err) {
      res.status(400).json({ status: "failed" });
    } else {
      let updateResponse = await updateTheUserWallet(userID, amount);
      if (updateResponse.status === "failed") {
        res
          .status(400)
          .json({ status: "failed", message: updateResponse.message });
      } else {
        res
          .status(200)
          .json({ status: "success", message: "payment successful" });
      }
    }
  });
};
