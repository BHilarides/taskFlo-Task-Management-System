/**
 * Dashboard Page
 * Purpose - Acts as the main landing page for the applicatio and provides a high-level
 * overview of tasks and navigation.
 * Features: Displays summary cards(Urgent, This Week, Overdue)
 * shows a preview list of tasks (limited to 5 items)
 * includes navigation for viewing tasks and quick actions
 * Logo functions as a HomeButton and routes back to the dashboard
 * Data Source: Uses TaskServices
 * Calls getTasks() and slices the result for preview
 * This page does not display full task details(status/priority intentionally excluded)
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { RecentProjects } from '../recent-projects/recent-projects';
import { QuickActions } from '../quick-actions/quick-actions';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SummaryCard,
    RecentProjects,
    QuickActions
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard  {}
