import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Task } from '../tasks.model';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {
  tasks!: Task[]
  constructor(private taskService: ReportService) { }
  ngOnInit() {
    this.getBug();
  }
  getBug() {
    this.taskService.getBug().subscribe(
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
