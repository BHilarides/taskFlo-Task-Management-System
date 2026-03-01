import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TaskService } from '../../core/services/task.service';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskById']);

    await TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Loads task successfully
  it('should load task on init', () => {
    taskServiceSpy.getTaskById.and.returnValue(
      of({
         _id: '123',
         title: 'Test Task',
         description: 'Test Desc',
         status: 'Pending',
         priority: 'High'
        })
    );

    fixture.detectChanges();

    expect(component.task.title).toBe('Test Task');
    expect(component.loading).toBeFalse();
  });

  // Test 2: handles API error
  it('should show error if task load fails', () => {
    taskServiceSpy.getTaskById.and.returnValue(
      throwError(() => new Error('API error'))
    );

    fixture.detectChanges();

    expect(component.error).toBe('Failed to load task');
    expect(component.loading).toBeFalse();
  });

  // Test 3: invalid route ID
  it('should handle missing task ID', () => {
    component['route'].snapshot.paramMap.get = () => null;

    component.ngOnInit();

    expect(component.error).toBe('Invalid task ID');
  });
});
