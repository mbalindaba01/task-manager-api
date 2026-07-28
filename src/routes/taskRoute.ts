import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, searchTasks, updateTask, updateTaskStatus } from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAllTasks);
router.post("/", authMiddleware, createTask);
router.get("/search", authMiddleware, searchTasks);
router.get("/:id", getTaskById);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id/:status", authMiddleware, updateTaskStatus);


export default router;