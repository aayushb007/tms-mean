import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  task!: Task[];
  constructor(private taskService: TaskService, private router: Router) { }
  newForm!: FormGroup;
  userId!:string | null;
  ngOnInit(): void {
    this.initForm();
  }
  private initForm() {
    let title = '';
    let desc = '';
    let due_date;
    let status = '';


    this.newForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'due_date': new FormControl(due_date, Validators.required),
      'status': new FormControl(status, Validators.required)
    })
  }
  onSubmit() {
    this.userId = localStorage.getItem('id');
    const user = this.userId !== null ? this.userId : '';
    console.log(user);
    
    const newTask = new Task(

      this.newForm.value['title'],
      user,
      this.newForm.value['desc'],
      this.newForm.value['due_date'],
      this.newForm.value['status']
    )
    console.log('task',newTask);
    
    this.taskService.addTask(newTask).subscribe(
      (next) => {
        console.log(next);
        this.taskService.getTasks().subscribe(res => {
          this.task = res;
          this.taskService.taskChanged.next(res)
          this.router.navigate(['/task']);
        })

      }, (error) => {
        console.log('Error', error);

      }
    )
   
  }

}
