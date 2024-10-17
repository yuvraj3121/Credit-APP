import { Router } from "express";
import {
  applyForLoan,
  borrowersCount,
  cashDisbursed,
  userLoans,
  getLoansDetails,
} from "../controllers/loan.controller";

const router = Router();

router.post("/applyForLoan/:Id", applyForLoan);
router.get("/borrowersCount", borrowersCount);
router.get("/cashDisbursed", cashDisbursed);
router.get("/userLoans/:Id", userLoans);
router.get("/allLoans", getLoansDetails);
// router.post("/loanVerified/:loanId", loanVerified);

export default router;
