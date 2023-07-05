import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { TaskCreateComponent } from './components/task/task-create/task-create.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { AuthGuard } from './components/user/auth.guard';
import { FeatureComponent } from './components/report/feature/feature.component';
import { AllTaskComponent } from './components/report/all-task/all-task.component';
import { BugComponent } from './components/report/bug/bug.component';
import { CreateFeatureComponent } from './components/report/feature/create-feature/create-feature.component';
import { CreateTaskComponent } from './components/report/feature/create-task/create-task.component';
import { CreateSubTaskComponent } from './components/report/feature/create-sub-task/create-sub-task.component';
import { CreateDependentTaskComponent } from './components/report/feature/create-dependent-task/create-dependent-task.component';

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
  {path:'new',component: CreateTaskComponent,canActivate: [AuthGuard] },
  {path:'new-sub',component: CreateSubTaskComponent,canActivate: [AuthGuard] },
  {path:'new-dep',component: CreateDependentTaskComponent,canActivate: [AuthGuard] },
   
  {path:'new-feature',component: CreateFeatureComponent,canActivate: [AuthGuard] },
  {path:"feature",component:FeatureComponent ,canActivate: [AuthGuard]},
  {path:"all-tasks",component:AllTaskComponent ,canActivate: [AuthGuard]},
  {path:"bug",component:BugComponent ,canActivate: [AuthGuard]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
