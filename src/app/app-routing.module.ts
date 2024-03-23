import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  {
  path: '',
  redirectTo: '/tasks',
  pathMatch: 'full'
  },
  {
    path:'tasks',
    component: TaskListComponent
  },
  {
    path:'add-task',
    component: CreateTaskComponent
  },
  {
    path:'edit-task/:id',
    component: EditTaskComponent
  },
  {
     path: 'task/:id',
     component: TaskDetailComponent
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
