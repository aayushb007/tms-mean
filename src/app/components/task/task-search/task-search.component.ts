import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  task!: Task[];
  searchForm!: FormGroup;

  constructor(private taskService: TaskService, private router: Router) {
   
   }
  ngOnInit(): void {
    this.initForm();
   
  }
  private initForm(){
    let search = '';
    this.searchForm = new FormGroup({
      'search':new FormControl()
    })
  }
  onSubmit(){
    const query = this.searchForm.value['search'];
    console.log(query);
    this.taskService.searchTask(query).subscribe(
      res =>{
       console.log(res);
      //  this.task = res;
      //  this.taskService.taskChanged.next(res)
      //  this.router.navigate(['/task']);
       
      },
      err =>{
        console.log(err
          );
        

      }
    )
    
  }
  
}
