/**
 * Central source of truth for task data
 * Responsibilities: Provides mock task data during frontend developement
 * Defines the Task interface
 * Will later connect to MongoDB-Backend API without changing components
 */

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Task } from './task.model';


@Injectable({ providedIn: 'root' })

export class TaskService {

  private mockTasks: Task[] = [
    {
      _id: '674a2b3c4d5e6f7a8b9c0d1e',
      title: 'Complete redesign of company website',
      status: 'In Progress',
      priority: 'High',
      description: 'Update the entire company website to reflect the new brand identity, ensuring a modern look and consistent visual language across all pages.',
      subtasks: [
        'Audit existing website content and structure',
        'Define new brand color palette, typography, and visual guidelines',
        'Align redesign with marketing and business goals'
      ]
    },
    {
      _id: '674a2b3c4d5e6f7a8b9c0d1f',
      title: 'Create initial design mockups for new homepage layout',
      status: 'Pending',
      priority: 'Medium',
      description: 'Design and present visual mockups for the new homepage that showcase layout, branding, and user experience before development begins.',
    },
      {
      _id: '674a2b3c4d5e6f7a8b9c0d1f',
      title: 'Develop and implement the new homepage UI',
      status: 'Completed',
      priority: 'Low',
       description: 'Translate approved design mockups into a fully functional, responsive homepage using modern front-end best practices.',
    }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }

  getTaskById(id: string): Observable<Task> {
    const task = this.mockTasks.find(t => t._id === id);

    if (!task) {
      return throwError(() => new Error('Task not found'));
    }

    return of(task);
  }

  searchTasks(query: string): Observable<{ success: boolean; data: Task[] }>  {

    const filteredTasks = this.mockTasks.filter(task=>
      task.title.toLowerCase().includes(query.toLowerCase())
    );

    return of({
      success: true,
      data: filteredTasks
    });
  }
}

