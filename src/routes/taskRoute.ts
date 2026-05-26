import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, searchTasks, updateTask } from "../controllers/taskController.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/search", searchTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


export default router;