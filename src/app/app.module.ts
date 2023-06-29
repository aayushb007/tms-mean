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
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
