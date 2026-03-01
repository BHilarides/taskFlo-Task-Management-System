import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TasksService } from '../../core/services/task';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let mockTasksService: jasmine.SpyObj<TasksService>;
  let mockActivatedRoute: any;

  const mockTask = {
    _id: '674a2b3c4d5e6f7a8b9c0d1e',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    priority: 'High',
    projectId: '674a1b2c3d4e5f6a7b8c9d0e',
    dueDate: new Date('2026-03-15'),
    dateCreated: new Date('2026-02-01'),
    dateModified: new Date('2026-02-28')
  };

  beforeEach(async () => {
    mockTasksService = jasmine.createSpyObj('TasksService', ['getTaskById']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('674a2b3c4d5e6f7a8b9c0d1e')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        TaskDetailComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Loads task successfully
  it('should load task on init', (done) => {
    mockTasksService.getTaskById.and.returnValue(
      of({
        success: true,
        data: mockTask
      })
    );

    fixture.detectChanges();

    setTimeout(() => {
      expect(component.task).toBe(mockTask);
      expect(component.loading).toBeFalse();
      done();
    }, 100);
  });

  // Test 2: handles API error
  it('should show error if task load fails', (done) => {
    mockTasksService.getTaskById.and.returnValue(
      throwError(() => new Error('API error'))
    );

    fixture.detectChanges();

    setTimeout(() => {
      expect(component.error).toBe('Failed to load task');
      expect(component.loading).toBeFalse();
      done();
    }, 100);
  });

  // Test 3: invalid route ID
  it('should handle missing task ID', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);

    fixture.detectChanges();

    expect(component.error).toBe('Invalid task ID');
    expect(component.loading).toBe(false);
  });
});
