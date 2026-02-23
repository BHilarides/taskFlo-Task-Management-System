import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../core/services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form-container">
      <h1>Create New Task</h1>

      @if (successMessage) {
        <div class="success-message">
          {{ successMessage }}
        </div>
      }

      @if (errorMessage) {
        <div class="error-message">
          {{ errorMessage }}
        </div>
      }

      <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            [(ngModel)]="task.title"
            required placeholder="Enter task title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            [(ngModel)]="task.description"
            rows="4"
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" name="status" [(ngModel)]="task.status" required>
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" name="priority" [(ngModel)]="task.priority" required>
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="projectId">Project ID</label>
          <select id="projectId" name="projectId" [(ngModel)]="task.projectId" required>
            <option value="">Select project</option>
            <option value="200000000000000000000001">Project 1</option>
            <option value="200000000000000000000002">Project 2</option>
            <option value="200000000000000000000003">Project 3</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            [(ngModel)]="task.dueDate"
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn-submit" [disabled]="!taskForm.valid || submitting">
            {{ submitting ? 'Creating...' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .task-form-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin-bottom: 20px;
      color: #2c3e50;
    }

    .success-message {
      background-color: #dff0d8;
      color: #155724;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      border: 1px solid #c3e6cb;
    }

    .error-message {
      background-color: #f8d7da;
      color: #721c24;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      border: 1px solid #f5c6cb;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-row {
      display: block;
      margin-bottom: 15px;
      font-weight: 600;
      color: #34495e;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #34495e;
    }

    input[type="text"],
    input[type="date"],
    textarea,
    select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: #007bff;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .btn-cancel {
      background-color: #6c757d;
      color: white;
    }

    .btn-cancel:hover {
      background-color: #5a6268;
    }

    .btn-submit {
      background-color: #007bff;
      color: white;
    }

    .btn-submit:hover:not(:disabled) {
      background-color: #0069d9;
    }

    .btn-submit:disabled {
      background-color: #007bff;
      cursor: not-allowed;
    }
  `]
})
export class TaskFormComponent {
  task = {
    title: '',
    description: '',
    status: '',
    priority: '',
    projectId: '',
    dueDate: ''
  };

  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  onSubmit() {
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const taskData = {
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      priority: this.task.priority,
      projectId: this.task.projectId,
      dueDate: this.task.dueDate ? new Date(this.task.dueDate).toISOString() : null,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString()
    };

    this.tasksService.createTask(taskData).subscribe({
      next: (response) => {
        this.successMessage = 'Task created successfully!';
        this.submitting = false;

        // Redirect to task list after a short delay
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create task. Please try again.';
        this.submitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
