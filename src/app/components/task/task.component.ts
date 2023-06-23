import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  selectedTask!: Task;
  constructor(private taskService:TaskService){}
  ngOnInit(): void {
    this.taskService.taskSelected.subscribe((task:Task)=>{
      this.selectedTask = task
    })
  }
  
}
