import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectCreateComponent } from './project-create.component';
import { ProjectService } from '../../core/services/project.service';
import { Router } from '@angular/router';


describe('ProjectCreateComponent', () => {

  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let router: Router;

  beforeEach(async () => {

    mockProjectService = jasmine.createSpyObj('ProjectService', ['createProject']);


    await TestBed.configureTestingModule({
      imports: [ProjectCreateComponent, RouterTestingModule],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Test One
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test Two
  it('should call project service when creating a project', () => {

    mockProjectService.createProject.and.returnValue(of({}));

    component.project = {
      name: 'Test Project',
      description: 'Testing project creation',
      priority: 'High',
      dueDate: '2026-04-01'
    };

    component.createProject();

    expect(mockProjectService.createProject).toHaveBeenCalled();
  });

  // Test Three
  it('should navigate to dashboard after successful project creation', () => {

    spyOn(router, 'navigate');

    mockProjectService.createProject.and.returnValue(of({}));

    component.project = {
      name: 'Navigation Test',
      description: 'Testing redirect',
      priority: 'Low',
      dueDate: ''
    };

    component.createProject();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});
