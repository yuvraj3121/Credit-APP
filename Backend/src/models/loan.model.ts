import mongoose, { Document, Model, Schema } from "mongoose";

interface ILoan extends Document {
  borrowerId: Schema.Types.ObjectId;
  fullname: string;
  amount: Number;
  tenure: Number;
  reason: string;
  status: string;
  address: string;
  action: string;
}

const LoanSchema: Schema = new Schema(
  {
    borrowerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullname: { type: String, required: true },
    amount: { type: Number, required: true },
    tenure: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true },
    address: { type: String, required: true },
    action: { type: String, required: true },
  },
  { timestamps: true }
);

const Loan: Model<ILoan> = mongoose.model<ILoan>("Loan", LoanSchema);

export { Loan, ILoan };
