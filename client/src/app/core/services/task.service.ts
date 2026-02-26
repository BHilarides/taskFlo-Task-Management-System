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
      title: 'Complete redesign of company website',
      status: 'In Progress',
      priority: 'High',
      description: 'Update the entire company website to reflect the new brand identitiy, ensuring a modern look and consistant visual language across all pages.',
      subtasks: [
        'Audit existing website content and structure',
        'Define new brand color palette, typography, and visual guidelines',
        'Align redesign with marketing and business goals'
      ]
    },
    {
      _id: '2',
      title: 'Create initial design mockups for new homepage layout',
      status: 'Pending',
      priority: 'Medium',
      description: 'Design and presnt visual mockups for the new homepage that showcase layout, branding, and user experience before development begins.',
      subtasks: [
        'Sketch low-fidelity wireframes for homepage sections',
        'Design high-fidelity mockups in Figma',
        'Review mockups with stakeholders and gather feedback'
      ]
    },
      {
      _id: '3',
      title: 'Develop and implement the new homepage UI',
      status: 'Completed',
      priority: 'Low',
       description: 'Translate approved design mockups into a fully functional, responsive homepage using modern front-end best practices.',
      subtasks: [
        'Build responsive layout using approved designs',
        'Implement branding styles(colors, fonts, components)',
        'perform cross-browser and device testing'
      ]
    },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }
}

