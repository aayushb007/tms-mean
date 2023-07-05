import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Task } from '../../report/tasks.model';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
   tasks!:Task[];
   constructor( private taskService:TasksService,private router:Router){}

   ngOnInit():void {
     this.taskService.taskChanged.subscribe(task =>{
      console.log('Latest Data', task);
      this.tasks = Array.isArray(task) ? task : [task];
      
     },
     err =>{
      console.log(err
        );
      
     })
     this.taskService.getTasks().subscribe(
      task =>{
        this.tasks = task;
      }
     )
   }
   goToNewPage(): void {
    this.router.navigate(['/new']);
  }
   
}
