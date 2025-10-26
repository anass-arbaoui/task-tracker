import express from "express";
import cors from "cors";
import taskRouter from "./task/router";
import { authRouter } from "./auth/router";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
