import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TaskListComponent } from "./task-list.component";
import { TaskService } from "../../core/services/task.service";
import { of } from "rxjs";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTaskService = {
    getTasks: () => of([
      {_id: '1', title: 'Task One', status: 'In Progress', priority: 'High', completed: false }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(component.tasks.length).toBe(1);
  });

  it('should render task titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Task One');
  });
});
