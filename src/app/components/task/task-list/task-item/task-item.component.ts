import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;

  @Input() index!: number;
  getButtonClass(): string {
    if (this.task.status === 'Pending') {
      return 'btn btn-outline-dark';
    } else if (this.task.status === 'On Hold') {
      return 'btn btn-outline-secondary';
    } else if (this.task.status === 'Complete') {
      return 'btn btn-outline-primary';
    } else if (this.task.status === 'Overdue') {
      return 'btn btn-outline-danger';
    } else {
      return 'btn';
    }
  }

  ngOnInit(): void {

    console.log(this.getButtonClass());

  }

}
