import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, searchTasks, updateTask } from "../controllers/taskController.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", auth.middleware, createTask);
router.get("/search", searchTasks);
router.get("/:id", getTaskById);
router.put("/:id", auth.middleware, updateTask);
router.delete("/:id", auth.middleware, deleteTask);


export default router;