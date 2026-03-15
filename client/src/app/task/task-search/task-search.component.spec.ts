import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskSearchComponent } from "./task-search.component";
import { TasksService } from "../../core/services/task";
import { Task } from "../../core/services/task.model";

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let mockTasksService: jasmine.SpyObj<TasksService>;

  const mockResults: Task[] = [
    {
       _id: '674a2b3c4d5e6f7a8b9c0d1e',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    priority: 'High',
    dueDate: new Date('2026-03-15'),
    dateCreated: new Date('2026-02-01'),
    dateModified: new Date('2026-02-28')
    }
  ];

  beforeEach(async () => {
    mockTasksService = jasmine.createSpyObj('TasksService', [
      'getTasks',
      'searchTasks'
    ]);

    await TestBed.configureTestingModule({
      imports: [TaskSearchComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: TasksService, useValue: mockTasksService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Succesful search
  it('should call service and return results when query is valid', () => {
    component.query = 'Test';

    mockTasksService.searchTasks.and.returnValue(
      of({ success: true, data: mockResults })
    );

    component.search();
    fixture.detectChanges();

    expect(mockTasksService.searchTasks).toHaveBeenCalledWith('Test');
    expect(component.results.length).toBe(1);
    expect(component.results).toEqual(mockResults);
    expect(component.error).toBeNull();
  });

  // Test 2: Empty query validation
  it('should show error if search query is empty', () => {
    component.query = ' ';

    component.search();

    expect(mockTasksService.searchTasks).not.toHaveBeenCalled();
    expect(component.error).toBe('Please enter a search term');
    expect(component.results.length).toBe(0);
  });

  // Test 3: Service error handling
  it('should set error message when search fails', () => {
    component.query = 'match';

    mockTasksService.searchTasks.and.returnValue(
      throwError(() => new Error('API Error'))
    );

    component.search();

    expect(mockTasksService.searchTasks).toHaveBeenCalledWith('match');
    expect(component.error).toBe('Search failed');
  });
});
