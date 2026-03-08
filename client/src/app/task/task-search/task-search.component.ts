import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TasksService } from "../../core/services/task";
import { Task } from "../../core/services/task.model";
import { Router } from "@angular/router";


@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  query = '';
  results: Task[] = [];
  error: string | null = null;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  search(): void {

    console.log("Search triggered:", this.query);


    if (!this.query.trim()) {
      this.error = 'Please enter a search term';
      return;
    }

    this.tasksService.searchTasks(this.query).subscribe({
      next: (response: { success: boolean; data: Task[]}) => {
        console.log("Search results:", response);
        this.results = response.data;
        this.error = null;
      },
      error: (err) => {
        console.error("Search error:", err);
        this.error = 'Search failed';
      }
    });
  }

  goToTask(task: any) {
    this.router.navigate(['/task-details', task._id]);
  }
}
