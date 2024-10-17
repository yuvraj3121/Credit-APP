import { Request, Response } from "express";
import { Loan } from "../models/loan.model";

export const applyForLoan = async (req: Request, res: Response) => {
  const { fullname, amount, tenure, reason, status, address1, address2 } =
    req.body;
  const borrowerId = req.params.Id;

  try {
    const newLoan = await Loan.create({
      borrowerId,
      fullname,
      amount,
      tenure,
      reason,
      status,
      address: address1 + ", " + address2,
      action: "pending",
    });

    res
      .status(201)
      .json({ message: "Applied for loan successfully", loan: newLoan });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};

export const borrowersCount = async (req: Request, res: Response) => {
  try {
    const totalCount = await Loan.countDocuments();
    res
      .status(201)
      .json({ message: "borrowers fetched successfully", totalCount });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};

export const cashDisbursed = async (req: Request, res: Response) => {
  try {
    const totalCash = await Loan.aggregate([
      {
        $group: {
          _id: null,
          totalCash: { $sum: "$amount" },
        },
      },
    ]);
    res.status(201).json({ message: "data fetched successfully", totalCash });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};

export const userLoans = async (req: Request, res: Response) => {
  const userId = req.params.Id;

  try {
    const userLoans = await Loan.find({ borrowerId: userId });
    res.status(201).json({ message: "data fetched successfully", userLoans });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};

export const getLoansDetails = async (req: Request, res: Response) => {
  try {
    const allLoans = await Loan.find();
    res.status(201).json({ message: "data fetched successfully", allLoans });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};

// export const loanVerified = async (req: Request, res: Response) => {
//   const loanId = req.params.loanId;

//   try {
//     if (!loanId) {
//       return res.status(400).json({ message: "Loan ID is required." });
//     }

//     const loan = await Loan.findByIdAndUpdate(
//       loanId,
//       { $set: { action: "verified" } },
//       { new: true }
//     );

//     if (!loan) {
//       return res.status(404).json({ message: "Loan not found." });
//     }

//     return res
//       .status(200)
//       .json({ message: "Loan verified successfully.", loan });
//   } catch (error) {
//     res.status(400).json({ message: "failed", error });
//   }
// };
