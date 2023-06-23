import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  id!: number;
  taskId!:string;
  task!:Task;
  editForm!: FormGroup;
  statusOptions: string[] = ['Pending', 'Complete', 'On Hold'];

  constructor( private route:ActivatedRoute,
    private taskService:TaskService,
    private router:Router){
    }
    ngOnInit(): void {
      console.log('Edit Component called');
      
      this.route.params.subscribe(
        (params:Params)=>{
          this.taskId =  params['taskId'];
        
          this.initForm();
          
        }
      )
    }
    private initForm(){
      let title = '';
      let desc = '';
      let due_date;
      let status = '';
      
      this.taskService.getTaskDetail(this.taskId).subscribe(task =>{
        var datePipe = new DatePipe("en-US");
        // this.task.due_date =  new Date(this.task.due_date);;
        
        this.task = task;
       
      })
      this.editForm = new FormGroup({
        'title': new FormControl(title,Validators.required),
        'desc': new FormControl(desc,Validators.required),
        'due_date': new FormControl(due_date,Validators.required),
        'status': new FormControl(status,Validators.required)
      })
    }
    
    onSubmit(){
      const newTask = new Task(

        this.editForm.value['title'],
        this.editForm.value['desc'],
        this.editForm.value['due_date'],
        this.editForm.value['status']
      )
      this.taskService.updateTask(this.taskId,newTask).subscribe(
        (next) =>{
          console.log(next);
          this.taskService.getTasks().subscribe(res =>{
           console.log('response after delete',res
           );
           
           this.taskService.taskChanged.next(res)
           alert('Task Updated!')
          })
          
       }
        // this.router.navigate(['/task'])
      );
      
    }
}
