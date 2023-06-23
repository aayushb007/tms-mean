import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { TaskCreateComponent } from './components/task/task-create/task-create.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { AuthGuard } from './components/user/auth.guard';

const routes: Routes = [
  { path: 'login',component: UserComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register',component: RegisterUserComponent  },
  {
    path:"task",component:TaskComponent ,canActivate: [AuthGuard] ,children:[
      {path: ':taskId', component: TaskDetailsComponent, canActivate: [AuthGuard] },
     
      {path:':taskId/edit',component : TaskEditComponent, canActivate: [AuthGuard] }
    ]
  },
  {path:'new',component: TaskCreateComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
