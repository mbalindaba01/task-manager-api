import { Request, Response } from "express";
import prisma from "../config/prisma.js"
import { validateTaskInput } from "../services/validateTask.js";
import { TaskStatus } from "../generated/prisma/enums.js";


export const getAllTasks = async (
    req: Request, 
    res: Response
) => {
    try  {
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.user?.id
            }
        });
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

        //Validation
        const validationError = validateTaskInput(
        title,
        description
        );

        if (!validationError.valid) {
        return res.status(400).json({
            error: validationError.error,
        });
        }

        const userId = req.user?.id; 

        //Create Task in DB
        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId
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
            where: { 
                id: String(id), userId: req.user?.id }
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

         //Validation
        const validationError = validateTaskInput(
        title,
        description
        );

        if (!validationError.valid) {
        return res.status(400).json({
            error: validationError,
        });
        }

        //Update Task in DB
        const task = await prisma.task.update({
            where: { id: String(id), userId: req.user?.id },
            data: {
                title,
                description
            }
        });
         if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
}

export const deleteTask = async (
    req: Request, 
    res: Response
) => {
    try {
        const { id } = req.params;

        const task = await prisma.task.delete({
            where: { id: String(id) },
        });
         if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
}

export const searchTasks = async (
    req: Request, 
    res: Response
) => {
    try {
        const { q } = req.query;
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.user?.id,
                OR: [
                    { title: { 
                        contains: String(q),
                        mode: "insensitive"
                    } 
                },
                    { description: { 
                        contains: String(q),
                        mode: "insensitive"
                    } 
                }
                ]
            }
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to search tasks" });
    }
}

export const updateTaskStatus = async (
    req: Request, 
    res: Response
) => {
    try {
        const { id, status } = req.params;
        console.log("Status:", status);
        console.log("Task ID:", id);
        if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
        return res.status(400).json({
            error: "Invalid status"
        });
}
        const task = await prisma.task.update({
            where: { 
                id: String(id), 
                userId: req.user?.id 
            },
            data: { status: status as TaskStatus }
        });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task status" });
    }
}


//add deadline
//add reminders
//set preferences for how frequently reminders should be sent