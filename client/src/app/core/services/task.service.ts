/**
 * Central source of truth for task data
 * Responsibilities: Provides mock task data during frontend developement
 * Defines the Task interface
 * Will later connect to MongoDB-Backend API without changing components
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';


@Injectable({ providedIn: 'root' })

export class TaskService {

  private mockTasks: Task[] = [
    {
      _id: '1',
      title: 'Completed project documentation',
      status: 'In Progress',
      priority: 'High',
    },
    {
      _id: '2',
      title: 'Create task list UI',
      status: 'Pending',
      priority: 'Medium',
    },
      {
      _id: '3',
      title: 'Write unit tests',
      status: 'Completed',
      priority: 'Low',
    },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }
}

