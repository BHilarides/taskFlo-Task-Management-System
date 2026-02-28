import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from '../../core/services/task';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-edit-container">
      <h1>Edit Task</h1>

      @if (loading) {
        <div class="loading">Loading task...</div>
      }

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

      @if (!loading && task._id) {
        <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              [(ngModel)]="task.title"
              required
              placeholder="Enter task title"
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
              required
            />
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="cancel()">Cancel</button>
            <button type="submit" class="btn-submit" [disabled]="!taskForm.valid || submitting">
              {{ submitting ? 'Updating...' : 'Update Task' }}
            </button>
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .task-edit-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 20px;
    }

    .loading {
      text-align: center;
      font-size: 18px;
      color: #7f8c8d;
    }

    .success-message {
      background-color: #dff0d8;
      color: #3c763d;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      border: 1px solid #d6e9c6;
    }

    .error-message {
      background-color: #f2dede;
      color: #a94442;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      border: 1px solid #ebccd1;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
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
      background-color: #95a5a6;
      color: white;
    }

    .btn-cancel:hover {
      background-color: #7f8c8d;
    }

    .btn-submit {
      background-color: #3498db;
      color: white;
    }

    .btn-submit:hover:not(:disabled) {
      background-color: #2980b9;
    }

    .btn-submit:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
  `]
})
export class TaskEditComponent implements OnInit {
  task: any = {
    _id: '',
    title: '',
    description: '',
    status: '',
    priority: '',
    projectId: '',
    dueDate: ''
  };

  loading = true;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  taskId = '';

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
    if (this.taskId) {
      this.loadTask();
    }
  }

  loadTask(): void {
    this.loading = true;
    this.tasksService.getTaskById(this.taskId).subscribe({
      next: (response: any) => {
        this.task = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load task';
        this.loading = false;
        console.error('Error loading task:', err);
      }
    });
  }

  onSubmit(): void {
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updateData = {
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      priority: this.task.priority,
      projectId: this.task.projectId,
      dueDate: this.task.dueDate
    };

    this.tasksService.updateTask(this.task._id, updateData).subscribe({
      next: (response) => {
        this.successMessage = 'Task updated successfully!';
        this.submitting = false;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },

      error: (err) => {
        this.errorMessage = 'Failed to update task. Please try again.';
        this.submitting = false;
        console.error('Error updating task:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
