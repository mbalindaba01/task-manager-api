import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, searchTasks, updateTask } from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAllTasks);
router.post("/", authMiddleware, createTask);
router.get("/search", authMiddleware, searchTasks);
router.get("/:id", getTaskById);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);


export default router;