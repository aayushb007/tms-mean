import { Component } from '@angular/core';

@Component({
  selector: 'app-list-bug',
  templateUrl: './list-bug.component.html',
  styleUrls: ['./list-bug.component.css']
})
export class ListBugComponent {


  getTask() {
    this.taskService.getTask().subscribe(
      (task) => {
      //  this.features = feature;
        console.log(task); 
        this.tasks = Array.isArray(task) ? task : [task];
      console.log(task);
      },
      (error) => {
        console.error('Error fetching task:', error);
      }
    );
  }
}
