import express, { Request, Response } from "express";
import { usersTable } from "../db/schema";
import db from "../db/client";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../helpers/password";
import { generateToken } from "../helpers/jwt";

export const registerUser = async (req: Request, res: Response) => {
  const { login, password, name } = req.body;
  if (!login || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, login));
  if (existingUser.length > 0) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = await db
      .insert(usersTable)
      .values({ login, password: hashedPassword })
      .returning();
    return res.status(201).json({
      message: "User registered successfully",
      data: newUser[0],
      success: true,
    });
  } catch (error) {
    console.log("Error registering user", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.login, login));
    const user = result[0];
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    // Generate JWT token

    const token = generateToken({ ...user, password: undefined });
    res
      .status(200)
      .json({ message: "Login successful", token: token, success: true });
  } catch (error) {
    console.log("Error logging in", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
