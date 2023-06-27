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
  userId!:string | null  ;

  taskId!: string;
  task!: Task;
  due_date!:any;
  editForm!: FormGroup;
  statusOptions: string[] = ['Pending', 'Complete', 'On Hold', 'Overdue'];

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) {
  }
  ngOnInit(): void {
    console.log('Edit Component called');

    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId'];

        this.initForm();

      }
    )
  }
  private initForm() {
    let title = '';
    let desc = '';
    let due_date;
    let status = '';

    this.taskService.getTaskDetail(this.taskId).subscribe(task => {
      var datePipe = new DatePipe('en-US');
      this.due_date =  datePipe.transform(task.due_date, 'yyyy-MM-dd');
       console.log(this.due_date);
       
      this.task = task;

    })
    this.editForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'due_date': new FormControl(due_date, Validators.required),
      'status': new FormControl(status, Validators.required)
    })
  }

  onSubmit() {
    this.userId = localStorage.getItem('id');
    const user = this.userId !== null ? this.userId : '';
    const newTask = new Task(
      
      this.editForm.value['title'],
      user,
      this.editForm.value['desc'],
      this.editForm.value['due_date'],
      this.editForm.value['status']
    )
    console.log(newTask);
    
    this.taskService.updateTask(this.taskId,newTask).subscribe(
      (next) => {
        console.log(next);
        this.taskService.getTasks().subscribe(res => {
          console.log('response after delete', res
          );

          this.taskService.taskChanged.next(res)
          alert('Task Updated!')
        })

      }
      // this.router.navigate(['/task'])
    );

  }
}
