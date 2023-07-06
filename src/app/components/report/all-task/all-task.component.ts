import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {
   tasks!:Task[];
   sortField: string = '';
sortOrder: string = 'asc';
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





   sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.tasks.sort(this.compareValues(field, this.sortOrder));
  }
  
  compareValues(key: string, order: string = 'asc'): any {
    return (a: any, b: any) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (order === 'desc') ? (comparison * -1) : comparison;
    };
  }
  
  getSortIcon(field: string): string {
    if (this.sortField === field) {
      return this.sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    }
    return 'fa-sort';
  }
  
}
