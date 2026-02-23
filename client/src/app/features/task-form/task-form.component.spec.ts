import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TasksService } from '../../core/services/task';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTasksService: jasmine.SpyObj<TasksService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    mockTasksService = jasmine.createSpyObj('TasksService', ['createTask']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create task and show success message', (done) => {
    const mockResponse = {
      success: true,
      message: 'Task created successfully',
      data: { _id: '1', title: 'Test Task', description: 'Test Description' }
    };

    mockTasksService.createTask.and.returnValue(of(mockResponse));

    component.task = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      priority: 'High',
      projectId: '200000000000000000000001',
      dueDate: '2026-03-01'
    };

    component.onSubmit();

    expect(mockTasksService.createTask).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.successMessage).toBe('Task created successfully!');
      expect(component.submitting).toBe(false);
      done();
    }, 100);
  });

  it('should display error message on task creation failure', (done) => {
    mockTasksService.createTask.and.returnValue(
      throwError(() => new Error('Server error'))
    );

    component.task = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      priority: 'High',
      projectId: '200000000000000000000001',
      dueDate: '2026-03-01'
    };

    component.onSubmit();

    setTimeout(() => {
      expect(component.errorMessage).toBe('Failed to create task. Please try again.');
      expect(component.submitting).toBe(false);
      done();
    }, 100);
  });
});
