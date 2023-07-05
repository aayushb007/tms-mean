import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  selectedTask!: Task;
  name!:string | null ;
  constructor(private taskService:TaskService,private userService:UserService){}
  ngOnInit(): void {
    this.taskService.taskSelected.subscribe((task:Task)=>{
      this.selectedTask = task
      console.log("Selected Task",task);
      
    })
  
    this.name = localStorage.getItem("name")
    console.log(this.name);
    
    
  }
  
}
