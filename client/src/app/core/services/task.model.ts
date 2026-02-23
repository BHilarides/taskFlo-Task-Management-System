export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}
