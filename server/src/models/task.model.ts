import mongoose, { Schema, Document } from 'mongoose';

export interface TaskDocument extends Document {
    title: string;
    description: string;
    status: string;
    priority: string;
}

const TaskSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, default: false},
},
{ timestamps: true }
);
export const Task = mongoose.model<TaskDocument>('Task', TaskSchema);