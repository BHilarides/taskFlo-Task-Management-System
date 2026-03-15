/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 13 March 2026
 * File: project-list.component.spec.ts
 * Description: Unit tests for project-list component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';


describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let httpMock: HttpTestingController;

  const mockProjects = [
    {
      _id: '674a1b2c3d4e5f6a7b8c9d0e',
      name: 'TaskFlo Development',
      description: 'Build task management system',
      priority: 'High',
      dueDate: new Date('2026-04-03'),
      dateCreated: new Date('2026-02-01')
    },
    {
      _id: '674a1b2c3d4e5f6a7b8c9d0f',
      name: 'Website Design',
      description: 'Update the company webpage',
      priority: 'Medium',
      dueDate: new Date('2026-05-15'),
      dateCreated: new Date('2026-02-15')
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test 1
  it('should load projects on init', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/projects`);
    expect(req.request.method).toBe('GET');

    req.flush({
      success: true,
      count: 2,
      data: mockProjects
    });
  });

  // Test 2
  it('should display error message on load failure', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/projects`);
    req.error(new ProgressEvent('error'));

    expect(component.error).toBe('Failed to load projects');
    expect(component.loading).toBe(false);
    expect(component.projects.length).toBe(0);
  });

  // Test 3
  it('should receive correct response structure from API', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/projects`);
    req.flush({
      success: true,
      count: 2,
      data: mockProjects
    });

    expect(component.projects).toBeDefined();
    expect(component.projects.length).toBe(2);
    expect(component.projects).toEqual(mockProjects);
  });
});
