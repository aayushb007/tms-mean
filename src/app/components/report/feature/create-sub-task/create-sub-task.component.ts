import { Component } from '@angular/core';
import { Task } from '../../feature.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../report.service';
import { UserService } from 'src/app/components/user.service';
import { TasksService } from 'src/app/components/task/tasks.service';

@Component({
  selector: 'app-create-sub-task',
  templateUrl: './create-sub-task.component.html',
  styleUrls: ['./create-sub-task.component.css']
})
export class CreateSubTaskComponent {
  tasks!:Task[];
  users!:any;
  featureForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private featService:ReportService,private userService:UserService,private taskService:TasksService) { }

  ngOnInit() {
    this.getUser();
    this.getTask();
    this.featureForm = this.formBuilder.group({
      taskType: ['', Validators.required],
      parentTaskId: ['', Validators.required],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

   getTask(){
     this.taskService.getTasks().subscribe(
      (task)=>{
        console.log(task);
        this.tasks = task
        
    },(error)=>{
      console.error('Error fetching Task:', error);
      
    }
     )
   }
   getUser(){
    this.userService.getUsers().subscribe(
      (user) => {
        //  this.features  = feature;
          console.log(user); 
          this.users = user 
          //Array.isArray(feature) ? feature : [feature];
        console.log(this.users);
        },
        (error) => {
          console.error('Error fetching feature:', error);
        }
    )
   }
   onSubmit() {
    const newTask = this.featureForm.value
    newTask['taskId'] = this.featureForm.value['parentTaskId'];
    console.log(newTask);
    this.featService.addSubTask(newTask).subscribe(
      response => {
        console.log('Data inserted successfully!', response);
        // Handle the success case here
      },
      error => {
        console.error('Error inserting data:', error);
        // Handle the error case here
      }
    );
    // Process the form data here
   
  }

}
