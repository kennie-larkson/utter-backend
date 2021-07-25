import express from "express";
import { newPayment } from "./Controller";

const PaymentRouter = express.Router();
// ! add a middleware later to check isLogged & token
Router.post("/paymentCollection", newPayment);

export default PaymentRouter;
