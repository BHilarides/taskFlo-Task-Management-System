import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-projects.html',
  styleUrls: ['./recent-projects.css'],
})
export class RecentProjects {
  projects = [
    { name: 'Project Alpha', progress: 'In Progress', percent: '60%' },
    { name: 'Project Beta', progress: 'Pending', percent: '20%'},
    { name: 'Project Gamma', progress: 'Completed', percent: '100%'}
  ];
}

