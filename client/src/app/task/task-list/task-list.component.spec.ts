/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 21 february 2026
 * File: task-list.component.spec.ts
 * Description: Unit tests for task-list component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
<<<<<<< HEAD
=======

>>>>>>> mariea/develop
import { TasksService } from '../../core/services/task';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockTasks = [
    {
      _id: '674a2b3c4d5e6f7a8b9c0d1e',
      title: 'Design homepage mockups',
      description: 'Create initial design mockups',
      status: 'In Progress',
      priority: 'High',
      dueDate: new Date('2024-03-01'),
      dateCreated: new Date('2024-02-20'),
      dateModified: new Date('2024-02-22'),
      projectId: '674a1b2c3d4e5f6a7b8c9d0e',
    },
    {
      _id: '674a2b3c4d5e6f7a8b9c0d1f',
      title: 'Set up database schema',
      description: 'Define MongoDB schema for tasks',
      status: 'Pending',
      priority: 'Medium',
      dueDate: new Date('2024-03-05'),
      dateCreated: new Date('2024-02-21'),
      dateModified: new Date('2024-02-21'),
      projectId: '674a1b2c3d4e5f6a7b8c9d0e',
    }
  ];

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter }
      ]
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
    req.flush('Error', { status: 500, statusText: 'Server Error' });

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

  // Adding delete tests for component BH 3/6/2026
  describe('Delete Task', () => {
    beforeEach(() => {
      fixture.detectChanges();
      const req = httpMock.expectOne(`${environment.apiBaseUrl}/tasks`);
      req.flush({
        success: true,
        count: 2,
        data: mockTasks
      });
    });

    it('should delete a task when confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(true);

      const taskIdToDelete = '674a2b3c4d5e6f7a8b9c0d1e';

      component.deleteTask(taskIdToDelete);

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/tasks/${taskIdToDelete}`);
      expect(req.request.method).toBe('DELETE');

      req.flush({
        success: true,
        message: 'Task deleted successfully'
      });

      expect(component.tasks.length).toBe(1);
      expect(component.tasks[0]._id).toBe('674a2b3c4d5e6f7a8b9c0d1f')
      expect(component.successMessage).toBe('Task deleted successfully')
    });

    it('should not delete a task when user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      const originalLength = component.tasks.length;

      component.deleteTask('674a2b3c4d5e6f7a8b9c0d1e');

      expect(component.tasks.length).toBe(originalLength);
      httpMock.expectNone(`${environment.apiBaseUrl}/tasks/674a2b3c4d5e6f7a8b9c0d1e`);
    });

    it('should show error message on failed delete', () => {
      spyOn(window, 'confirm').and.returnValue(true);

      const taskIdToDelete = '674a2b3c4d5e6f7a8b9c0d1e';

      component.deleteTask(taskIdToDelete);

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/tasks/${taskIdToDelete}`);
      expect(req.request.method).toBe('DELETE');

      req.error(new ProgressEvent('error'));

      expect(component.error).toBeTruthy();
      expect(component.error).toContain('Error deleting task');
    });
  });
});
