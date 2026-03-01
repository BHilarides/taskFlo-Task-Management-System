import {Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service'
import { Task } from '../../core/services/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (!taskId) {
      this.error = 'Invalid task ID';
      this.loading = false;
      return;
    }

    console.log('Fetching task by ID:', taskId);

    this.taskService.getTaskById(taskId).subscribe({
      next: (task: Task) => {
        this.task = task;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load task';
        this.loading = false;
      }
    });
  }
}
