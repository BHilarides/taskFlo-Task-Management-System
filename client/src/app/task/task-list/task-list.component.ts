/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 21 february 2026
 * File: task-list.component.ts
 * Description: Task-list component
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TasksService } from '../../core/services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <button class="back-btn" routerLink="/">
    <-- to Dashboard
  </button>

  <section class="task-list-page">
  <header class="task-list-header">
    <div>
      <h2>All Tasks</h2>
      <p class="subtitle">Track progress and stay organized</p>
    </div>
  </header>

  @if (successMessage) {
    <div class="success-message">
      {{ successMessage }}
    </div>
  }

  @if (loading) {
    <div class="loading">Loading tasks...</div>
  }

  @if (error) {
    <div class="error">{{ error }}</div>
  }

  @if (!loading && !error) {
    <section class="task-grid">
      @if (tasks.length === 0) {
        <p>No tasks found.</p>
      }

      @for (task of tasks; track task._id) {
        <article class="task-card" (click)="viewTask(task._id)">
          <header class="task-header">
            <h3>{{ task.title }}</h3>
            <div class="task-actions">
              <button
                class="icon-btn delete-btn"
                (click)="deleteTask(task._id); $event.stopPropagation()"
                title="Delete Task"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </header>

          <p class="task-description">{{ task.description }}</p>

          <p class="task-due-date" *ngIf="task.dueDate">
            <strong>Due:</strong> {{ task.dueDate | date: 'shortDate' }}
          </p>

          <div class="task-meta">
            <span class="status" [ngClass]="getStatusClass(task.status)">
              {{ task.status }}
            </span>
            <span class="priority" [ngClass]="getPriorityClass(task.priority)">
              {{ task.priority }} Priority
            </span>
          </div>
        </article>
      }
    </section>
  }

  <footer class="app-footer">
    <p>TaskFlo 2026 * Organize smarter, work faster</p>
  </footer>
</section>
`,

/** Updated the task list component styles to match the TaskFlo branding and improved the layout
 * using a 3x3 grid for task cards. Enhanced card styling with consistent spacing, shadows, and
 * branded accent colors. -MN
 */
  styles: [`

    .task-list-page {
      padding: 2.5rem 3rem;
      background-color: #f9fafb;
      min-height: 100vh;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 20px;
    }

    .loading, .error {
      padding: 20px;
      text-align: center;
      font-size: 18px;
    }

    .error {
      color: #e74c3c;
      background-color: #f9e6e6;
      border-radius: 4px;
    }

    .success-message {
      background-color: #d4edda;
      color: #155724;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 20px;
      border: 1px solid #c3e6cb;
    }

    .task-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .task-card {
      background: white;
      border-radius: 14px;
      padding: 20px;
      min-height: 180px;
      boarder-top: 5px solid #1e3a8a;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s ease;
    }

    .task-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .task-header h3 {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: #111827;
      flex: 1;
    }

    .task-description {
      font-size: 0.9rem;
      color: #4b5563;
      margin-bottom: 12px;
    }

    .task-due-date {
      font-size: 0.85rem;
      color: #6b7280;
      margin-bottom: 12px;
    }

    .task-actions {
      display: flex;
      gap: 8px;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
      font-size: 16px;
    }

    .delete-btn {
      color: #ef4444;
    }

    .delete-btn:hover {
      background-color: #fee2e2;
    }

    .task-card h3 {
      margin: 0 0 10px 0;
      color: #34495e;
    }

    .task-meta {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .task-meta span {
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status.completed {
      background: #e6f4ea;
      color: #2e7d32;
    }

     .status.pending {
      background: #fff3e0;
      color: #ef6c00;
    }

     .status.in-progress {
      background: #e3f2fd;
      color: #1565c0;
    }

     .priority.high {
      background: #fdecea;
      color: #c62828;
    }

     .priority.medium {
      background: #fff8e1;
      color: #f9a825;
    }

     .priority.low {
      background: #e8f5e9;
      color: #2e7d32;
    }

  `]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  loading: boolean = true;
  error: string = '';
  successMessage: string = '';

  constructor(
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    console.log('Ben component - Loading tasks from API');
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks = data.data;
        this.loading = false;
        console.log('Tasks loaded:', this.tasks);
      },
      error: (err: any) => {
        this.error = 'Failed to load tasks';
        this.loading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/tasks', taskId])
  }

  deleteTask(taskId: string): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`Task with ID ${taskId} deleted successfully`);
        this.tasks = this.tasks.filter(t => t._id !== taskId);
        this.successMessage = 'Task deleted successfully';
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(`Error deleting task with ID ${taskId}:`, err);
        this.error = `Error deleting task. Please try again later.`;
        this.clearMessageAfterDelay();
      }
    });
  }

  private clearMessageAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.error = '';
    }, 3000);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  getPriorityClass(priority: string): string {
    return priority.toLowerCase();
  }
}
