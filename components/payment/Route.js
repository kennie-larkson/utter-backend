import express from "express";
import { newPayment, verify_Payment } from "./Controller.js";
// import paystack from "./paystack.js"

// const PaymentRouter = express.Router();
// ! add a middleware later to check isLogged & token
// PaymentRouter.post("/paymentCollection", newPayment);
const PaymentRouter = express.Router();
PaymentRouter.route("/paystack/initialize").post(newPayment)
PaymentRouter.route("/paystack/verify").get(verify_Payment)

export default PaymentRouter;
