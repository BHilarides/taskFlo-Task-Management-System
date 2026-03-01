import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Task } from '../models/task.model';

export const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch {
        res.status(500).json({ message: 'Failed to fetch tasks'});
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};