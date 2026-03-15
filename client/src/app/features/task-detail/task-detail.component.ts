import {Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../core/services/task'
import { Task } from '../../core/services/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any = null;
  taskId: string = '';
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (!taskId) {
      this.error = 'Invalid task ID';
      this.loading = false;
      return;
    }

    this.taskId = taskId

    console.log('Fetching task by ID:', taskId);

    this.tasksService.getTaskById(taskId).subscribe({
      next: (response: any) => {
        this.task = response.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load task';
        this.loading = false;
      }
    });
  }

  editTask(): void {
    this.router.navigate(['/tasks/edit', this.taskId]);
  }

  deleteTask(): void {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return;
    }

    this.tasksService.deleteTask(this.taskId).subscribe({
      next: () => {
        console.log(`Task ${this.taskId} deleted successfully`);
        this.router.navigate(['/all-tasks']);
      },
      error: (err: any) => {
        console.error('Error deleting task:', err);
        this.error = 'Failed to delete task. Please try again.';
      }
    })
  }
}
