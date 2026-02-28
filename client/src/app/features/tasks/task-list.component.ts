import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/services/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  expandedTaskId: string | null = null;

   constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  toggleTask(taskId: string) {
    this.expandedTaskId =
      this.expandedTaskId === taskId ? null : taskId;
  }

  isExpanded(taskId: string): boolean {
    return this.expandedTaskId === taskId;
  }

  getStatusClass(status?: string): string {
    return status ? status.toLowerCase() : '';
  }

  getPriorityClass(priority?: string) {
    return priority ? priority.toLowerCase() : '';
  }
}

