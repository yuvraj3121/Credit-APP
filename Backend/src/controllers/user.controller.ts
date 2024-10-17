import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const secretKey = "your_jwt_secret_key";

export const register = async (req: Request, res: Response) => {
  const { username, fullname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      fullname,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
      const userData = await User.findById(user._id);
      const data = { userData, token };
      res.status(200).json({ message: "Login successful", data });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};

export const activeUsers = async (req: Request, res: Response) => {
  try {
    const totalCount = await User.countDocuments();
    res
      .status(200)
      .json({ message: "active users fetched successfully.", totalCount });
  } catch (error) {
    res.status(400).json({ message: "failed", error });
  }
};
