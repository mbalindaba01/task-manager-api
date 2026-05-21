import { Request, Response } from "express";
import prisma from "../config/prisma.js"


export const getAllTasks = async (
    req: Request, 
    res: Response
) => {
    try  {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    }catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

export const createTask = async (
    req: Request, 
    res: Response
) => {
    
    try {
        const { title, description } = req.body;

    if (typeof title !== "string"|| typeof description !== "string") {
        return res.status(400).json({ error: "Please enter valid title and description"});
    }

    if (title.trim() === "" || description.trim() === "") {
        return res.status(400).json({ error: "Title and description are required" });
    }
    
        const task = await prisma.task.create({
            data: {
                title,
                description
            }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }  
}

export const getTaskById = async (
    req: Request, 
    res: Response
) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch task" });
    }
}

export const updateTask = async (
    req: Request, 
    res: Response
) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (typeof title !== "string" || typeof description !== "string") {
            return res.status(400).json({ error: "Please enter valid title and description" });
        }

        if (title.trim() === "" || description.trim() === "") {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const task = await prisma.task.update({
            where: { id: String(id) },
            data: {
                title,
                description
            }
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
}
