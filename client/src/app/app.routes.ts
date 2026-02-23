import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { TaskListComponent } from './features/tasks/task-list.component';
import { TaskListComponent as BenTaskList } from './task/task-list/task-list.component';
import { TaskFormComponent } from './features/task-form/task-form.component';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tasks', component: TaskListComponent },
  { path: 'all-tasks', component: BenTaskList},
  { path: 'tasks/new', component: TaskFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
