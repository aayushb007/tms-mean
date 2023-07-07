import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../report/tasks.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;

  @Input() index!: number;
  getButtonClass(status:string): any{
    // if(!this.tasks){
    //   return 'btn btn-outline'
    // }

      if (status === 'Pending') {
        return 'btn btn-outline-dark';
      } else if (status === 'Inprogress') {
        return 'btn btn-outline-secondary';
      } else if (status === 'Completed') {
        return 'btn btn-outline-primary';
      } else if (status === 'Testing') {
        return 'btn btn-outline-danger';
      } else {
        return 'btn';
      }
    
    
  }
  ngOnInit(): void {

    // console.log(this.getButtonClass());

  }

}
