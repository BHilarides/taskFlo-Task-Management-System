/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 21 february 2026
 * File: task-list.component.spec.ts
 * Description: Unit tests for task-list component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let httpMock: HttpTestingController;

  const mockTasks = [
    {
      _id: '30000000000000000000001',
      title: 'Design homepage mockups',
      description: 'Create initial design mockups',
      status: 'In Progress',
      priority: 'High',
      dueDate: new Date('2024-03-01'),
      dateCreated: new Date('2024-02-20'),
      dateModified: new Date('2024-02-22'),
      projectId: '20000000000000000000001',
    },
    {
      _id: '30000000000000000000002',
      title: 'Set up database schema',
      description: 'Define MongoDB schema for tasks',
      status: 'Pending',
      priority: 'Medium',
      dueDate: new Date('2024-03-05'),
      dateCreated: new Date('2024-02-21'),
      dateModified: new Date('2024-02-21'),
      projectId: '20000000000000000000001',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/tasks`);
    expect(req.request.method).toBe('GET');

    req.flush({
      success: true,
      count: 2,
      data: mockTasks
    });

    expect(component.tasks.length).toBe(2);
    expect(component.tasks).toEqual(mockTasks);
    expect(component.loading).toBe(false);
  });

  it('should display error message on load failure', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/tasks`);
    req.error(new ProgressEvent('error'));

    expect(component.error).toBe('Failed to load tasks');
    expect(component.loading).toBe(false);
    expect(component.tasks.length).toBe(0);
  });

  it('should receive correct response structure from API', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/tasks`);
    req.flush({
      success: true,
      count: 2,
      data: mockTasks
    });

    expect(component.tasks).toBeDefined();
    expect(component.tasks.length).toBe(2);
    expect(component.tasks).toEqual(mockTasks);
  });
});
