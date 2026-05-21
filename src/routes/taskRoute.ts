import { Router } from "express";
import { createTask, getAllTasks, getTaskById } from "../controllers/taskController.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);

export default router;