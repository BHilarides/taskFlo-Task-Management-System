import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { TaskListComponent } from './features/tasks/task-list.component';
import { TaskListComponent as BenTaskList } from './task/task-list/task-list.component';
import { TaskFormComponent } from './features/task-form/task-form.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskDetailComponent } from './features/task-detail/task-detail.component';
import { TaskSearchComponent } from './task/task-search/task-search.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tasks', component: TaskListComponent },
  { path: 'all-tasks', component: BenTaskList},
  { path: 'tasks/new', component: TaskFormComponent},
  { path: 'tasks/edit/:id', component: TaskEditComponent },
  { path: 'tasks/:id', component: TaskDetailComponent},
  { path: 'task-search', component: TaskSearchComponent },
  { path: 'projects/new', component: ProjectCreateComponent},
  {path:'projects', component: ProjectListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
