import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { TaskComponent } from './components/task/task.component';
import { TaskCreateComponent } from './components/task/task-create/task-create.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { TaskItemComponent } from './components/task/task-list/task-item/task-item.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from './components/user.service';
import { TaskSearchComponent } from './components/task/task-search/task-search.component';
import { ReportComponent } from './components/report/report.component';
import { FeatureComponent } from './components/report/feature/feature.component';
import { FeatureItemComponent } from './components/report/feature/feature-item/feature-item.component';
import { AllTaskComponent } from './components/report/all-task/all-task.component';
import { BugComponent } from './components/report/bug/bug.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CreateFeatureComponent } from './components/report/feature/create-feature/create-feature.component';
import { CreateTaskComponent } from './components/report/feature/create-task/create-task.component';
import { CreateSubTaskComponent } from './components/report/feature/create-sub-task/create-sub-task.component';
import { CreateDependentTaskComponent } from './components/report/feature/create-dependent-task/create-dependent-task.component';
import { ListBugComponent } from './components/report/feature/list-bug/list-bug.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterUserComponent,
    TaskComponent,
    TaskCreateComponent,
    TaskEditComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskItemComponent,
    TaskSearchComponent,
    ReportComponent,
    FeatureComponent,
    FeatureItemComponent,
    AllTaskComponent,
    BugComponent,
    CreateFeatureComponent,
    CreateTaskComponent,
    CreateSubTaskComponent,
    CreateDependentTaskComponent,
    ListBugComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config :{
        tokenGetter: ()=>{
          return localStorage.getItem('token');
        },
        allowedDomains:['localhost:3000'],
        disallowedRoutes:[]
      }
    })

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
