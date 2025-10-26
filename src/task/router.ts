import { Router } from "express";
import { controller } from "./controller";

const taskRouter = Router();

taskRouter.get("/", controller.getAll);
taskRouter.post("/", controller.create);
taskRouter.patch("/:id", controller.update);
taskRouter.delete(":/id", controller.delete);
export default taskRouter;
