import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
   tasks!:Task[];
   constructor( private taskService:TaskService,private router:Router){}

   ngOnInit():void {
     this.taskService.taskChanged.subscribe(res =>{
      console.log('Latest Data', res);
      this.tasks = res
      
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
