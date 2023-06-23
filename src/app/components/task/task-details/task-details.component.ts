import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  taskId!:string;
  task!:Task;
  id!:number;

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params)=>{

        this.taskId = params['taskId'];

        this.taskService.getTaskDetail(this.taskId).subscribe(task =>{
          this.task = task;
          console.log(task);
          
        })
      })
  }
  onEditTask(){
    this.router.navigate(['edit'],{relativeTo :this.route})  
  }
  onDeleteTask(){
       this.taskService.deleteTask(this.taskId).subscribe(
        (next) =>{
          console.log(next);
          this.taskService.getTasks().subscribe(res =>{
           console.log('response after delete',res
           );
           
           this.taskService.taskChanged.next(res)
          })
          
       }
       );
     
       this.router.navigate(['/task']);
  }

}
