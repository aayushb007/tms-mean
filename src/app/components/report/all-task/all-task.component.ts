import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {
   tasks!:Task[]
   constructor(private taskService: ReportService) {}
   ngOnInit() {
    this.getTask();
  }

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
   // Pagination properties
   pageSize = 3;
   currentPage = 1;
 
   // Function to change the current page
   onPageChange(event: any): void {
    this.currentPage = event.page;
  }
   // Function to get the paginated tasks
   getPaginatedTasks(): Task[] {
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = startIndex + this.pageSize;
     return this.tasks.slice(startIndex, endIndex);
   }
}
