/**
 * Author: Ben Hilarides
 * Date: 27 February 2026
 * File: task-edit.component.spec.ts
 * Description: Unit tests for Component to edit tasks
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';
import { TasksService } from '../../core/services/task';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;
  let mockTasksService: jasmine.SpyObj<TasksService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockTask = {
    _id: '300000000000000000000001',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    priority: 'High',
    projectId: '200000000000000000000001',
    dueDate: '2026-03-01',
    dateCreated: new Date('2026-02-15'),
    dateModified: new Date('2026-02-20')
  };

  beforeEach(async () => {
    mockTasksService = jasmine.createSpyObj('TasksService', ['getTaskById', 'updateTask']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('300000000000000000000001')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [TaskEditComponent],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task on init', (done) => {
    mockTasksService.getTaskById.and.returnValue(of({
      success: true,
      data: mockTask
    }));

    fixture.detectChanges();

    setTimeout(() => {
      expect(component.task.title).toBe('Test Task');
      expect(component.task.status).toBe('Pending');
      expect(component.loading).toBe(false);
      done();
    }, 100);
  });

  it('should update task and show success message', (done) => {
    component.task = {
      _id: '300000000000000000000001',
      title: 'Updated Task',
      description: 'Updated Description',
      status: 'In Progress',
      priority: 'Medium',
      projectId: '200000000000000000000001',
      dueDate: '2026-04-01'
    };

    mockTasksService.updateTask.and.returnValue(of({
      success: true,
      message: 'Task updated successfully',
      data: component.task
    }));

    component.onSubmit();

    expect(mockTasksService.updateTask).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.successMessage).toBe('Task updated successfully!');
      expect(component.submitting).toBe(false);
      done();
    }, 100);
  });

  it('should display error message on update failure', (done) => {
    component.task = {
      _id: '300000000000000000000001',
      title: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      priority: 'High',
      projectId: '200000000000000000000001',
      dueDate: '2026-03-01'
    };

    mockTasksService.updateTask.and.returnValue(
      throwError(() => new Error('Server error'))
    );

    component.onSubmit();

    setTimeout(() => {
      expect(component.errorMessage).toBe('Failed to update task. Please try again.');
      expect(component.submitting).toBe(false);
      done();
    }, 100);
  });
});
