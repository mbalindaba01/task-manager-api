import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTask } from "../controllers/taskController.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);

export default router;