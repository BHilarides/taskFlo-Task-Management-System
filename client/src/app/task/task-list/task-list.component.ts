/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 21 february 2026
 * File: task-list.component.ts
 * Description: Task-list component
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-list-container">
      <h1>All Tasks</h1>

      @if (loading) {
        <div class="loading">Loading tasks...</div>
      }

      @if (error) {
        <div class="error">{{ error }}</div>
      }

      @if (!loading && !error) {
        <div class="tasks">
          @if (tasks.length === 0) {
            <p>No tasks found.</p>
          }

          @for (task of tasks; track task._id) {
            <div class="task-card" (click)="editTask(task._id)">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <div class="task-meta">
                <span class="status">{{ task.status }}</span>
                <span class="priority">{{ task.priority }}</span>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .task-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
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

    .task-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .task-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .task-card h3 {
      margin: 0 0 10px 0;
      color: #34495e;
    }

    .task-meta {
      display: flex;
      gap: 15px;
    }

    .task-meta span {
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }

    .status {
      background-color: #3498db;
    }

    .priority {
      background-color: #e74c3c;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    console.log('Neb component - API URL:', `${environment.apiBaseUrl}/tasks`);
    this.loading = true;
    this.http.get(`${environment.apiBaseUrl}/tasks`).subscribe({
      next: (data: any) => {
        this.tasks = data.data;
        this.loading = false;
        console.log('Tasks loaded:', this.tasks);
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        this.loading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  editTask(taskId: string): void {
    this.router.navigate(['/tasks/edit', taskId])
  }
}
