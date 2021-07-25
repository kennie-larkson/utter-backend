import mongoose from "mongoose";

/**
 * tracks payment history from paystack
 */

const PaymentSchema = mongoose.Schema(
  {
    paidBy: String,
    amount: Number,
    paymentID: String,
  },
  { timestamps: true }
);

export default Payment = mongoose.model("Payment", PaymentSchema);
