import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// generate token
export const generateToken = (payload: any) => {
  return jwt.sign(
    payload, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "1h" } // options
  );
};

// verify token
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
