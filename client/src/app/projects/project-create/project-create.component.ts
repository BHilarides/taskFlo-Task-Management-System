import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProjectService } from'../../core/services/project.service';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {

  project = {
    name: '',
    description: '',
    priority: '',
    startDate: '',
    endDate: ''
  };

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  createProject() {

    this.projectService.createProject(this.project).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error("Project creation failed", err);
      }
    });
  }
}
