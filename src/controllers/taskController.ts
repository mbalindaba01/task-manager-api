import { Request, Response } from "express";

export const getAllTasks = (req: Request, res: Response) => {
    res.status(200).json({
            tasks: [
                {   id: 1, title: "Task 1", description: "Learn Express", completed: false},
                {  id: 2, title: "Task 2", description: "Build a REST API", completed: false},
            ]
    });
}