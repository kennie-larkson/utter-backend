import mongoose from "mongoose";

/**
 * tracks payment history from paystack
 */

const PaymentSchema = mongoose.Schema(
  {
    paidBy: String,
    amount: Number,
    paymentID: String,
    email: String,
    fullname: String,
    reference: String,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
