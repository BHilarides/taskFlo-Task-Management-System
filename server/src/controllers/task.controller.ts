import { Request, Response } from 'express';
import { Task } from '../models/task.model';

export const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch {
        res.status(500).json({ message: 'Failed to fetch tasks'});
    }
};