/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 13 March 2026
 * File: project-list.component.ts
 * Description: Project-list component
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="project-list-page">

      <button class="back-btn" routerLink="/">
        <-- to Dashboard
      </button>

      <header class="project-list-header">
        <div>
          <h2>All Projects</h2>
          <p class="subtitle">Track your projects</p>
        </div>
      </header>

      @if (loading) {
        <div class="loading">Loading projects...</div>
      }

      @if (error) {
        <div class="error">{{ error }}</div>
      }

      @if (!loading && !error) {
        <section class="project-grid">
          @if (projects.length === 0) {
          <p>No projects found</p>
          }

          @for (project of projects; track project._id) {
            <article class="project-card">
              <h3>{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-meta">
                <span class="priority" [ngClass]="getPriorityClass(project.priority)">
                  {{ project.priority }} Priority
                </span>
              </div>
            </article>
          }
        </section>
      }

      <footer class="app-footer">
        <p>TaskFlo 2026 * Organize smarter, work faster</p>
      </footer>
    </section>
  `,
  styles: [`
    .project-list-page {
      padding: 2.5rem 3rem;
      background-color: #f9fafb;
      min-height: 100vh;
    }

    project-list-header h2 {
    color: #2c3e50;
    font-size: 32px;
    margin: 0 0 8px 0;
    }

    .subtitle {
    color: #7f8c8d;
    font-size: 16px;
    margin: 0;
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

    .project-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .project-card {
      background: white;
      border-radius: 14px;
      padding: 20px;
      min-height: 180px;
      border-top: 5px solid #1e3a8a;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s ease;
    }

    project-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    }

    .project-card h3 {
      margin: 0 0 10px 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: #111827;
    }

    .project-description {
      font-size: 0.9rem;
      color: #4b5563;
      margin-bottom: 12px;
    }

    .project-meta {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .project-meta span {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    }

    .priority.high {
      background: #fdecea;
      color: #c62828;
    }

    .priority.medium {
      background: #fff8e1;
      color: #f9a825;
    }

    .priority.low {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .app-footer {
      margin-top: 60px;
      padding: 20px;
      text-align: center;
      color: #7f8c8d;
      font-size: 14px;
      border-top: 1px solid #e1e8ed;
    }
  `]
})
export class ProjectListComponent implements OnInit{
  projects: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data.data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load projects';
        this.loading = false;
        console.error('Error loading projects:', err);
      }
    });
  }

  getPriorityClass(priority: string): string {
    return priority ? priority.toLowerCase() : 'low';
  }

  goBack(): void {
  this.router.navigate(['/']);
  }
}
