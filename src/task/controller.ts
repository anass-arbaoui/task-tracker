import { Request, Response } from "express";
import db from "../db/client";
import { taskTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const controller = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, description, status } = req.body;
      if (!title || !description) {
        res.status(400).json({
          message: "title and description are required !",
          success: false,
        });
      }
      const data = await db
        .insert(taskTable)
        .values({ title, description, status })
        .returning();

      res.status(201).json({ taskId: data[0].id, success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server", success: false });
    }
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!id)
      return res.status(400).json({ message: "the Task id is required" });
    const data = await db
      .select()
      .from(taskTable)
      .where(eq(taskTable.id, Number(id)));

    if (data.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields provided" });
    }

    const result = await db
      .update(taskTable)
      .set(updates)
      .where(eq(taskTable.id, Number(id)))
      .returning();
    res
      .status(200)
      .json({ message: "Task updated successfully", task: result[0] });
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({
          message: "Task id is required",
        });

      const result = await db
        .delete(taskTable)
        .where(eq(taskTable.id, Number(id)))
        .returning();
      if (!result || result.length === 0)
        return res.status(404).json({ message: "task not found" });

      return res.status(200).json({ result: result[0], success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server issue", success: false });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const status = req.query.status as "todo" | "in progress" | "done";
      if (!status) {
        const result = await db.select().from(taskTable);
        return res.status(200).json({ data: result, success: true });
      }
      const result = await db
        .select()
        .from(taskTable)
        .where(eq(taskTable.status, status));
    } catch (error) {
      console.log("erreur lors de getAll ", error);
      res
        .status(500)
        .json({ message: "Internal server issue", success: false });
    }
  },
};
