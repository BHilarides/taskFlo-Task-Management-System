import { Component } from '@angular/core';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { RecentProjects } from '../recent-projects/recent-projects';
import { QuickActions } from '../quick-actions/quick-actions';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SummaryCard,
    RecentProjects,
    QuickActions
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {}
