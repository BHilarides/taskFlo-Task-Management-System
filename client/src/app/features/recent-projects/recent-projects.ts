import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recent-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-projects.html',
  styleUrls: ['./recent-projects.css'],
})
export class RecentProjects {
  projects = [
    { id: '674a2b3c4d5e6f7a8b9c0d1e', name: 'Design homepage mockups', progress: 'In Progress', percent: '60%' },
    { id: '674a2b3c4d5e6f7a8b9c0d1f', name: 'Review design mockups with stakeholders', progress: 'Pending', percent: '20%'},
    { id: '674a2b3c4d5e6f7a8b9c0d20', name: 'Design email templates for campaign', progress: 'Completed', percent: '100%'}
  ];
}

