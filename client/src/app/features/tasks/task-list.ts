/**
 * Displays the full list of tasks with detailed information
 * Features: Renders all tasks from TaskService
 * Displays (Title, Status, Priority)
 * Styled to visually match the dashboard (shared spacing, typography, layout style)
 * Data Source: Uses mock task data from TaskService
 * Designed so it will automatically load API data once backend is connected
 * Routing: Accessed via View Tasks button on the dashboard
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/services/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
}
