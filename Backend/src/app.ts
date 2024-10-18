import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route";
import loanRouter from "./routes/loan.route";

const app = express();

app.use(
  cors({
    origin: "https://credit-appv6.netlify.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/loans", loanRouter);

export { app };
