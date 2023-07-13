import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { ReportService } from '../report.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {
  tasks!: Task[];
  searchForm: FormGroup;
  filteredTasks!: Task[];
  sortField: string = '';
  sortOrder: string = 'asc';
  constructor(private taskService: ReportService,private formBuilder:FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search:['']
    })
   }
  ngOnInit() {
    this.taskService.taskChanged.subscribe(
      task => {
        console.log("latest", task);
        this.tasks = Array.isArray(task) ? task : [task];
      },
      err => {
        console.log(err);

      }
    )
    this.getTask();

  }
  onSubmit(): void {
    const searchTerm = this.searchForm.get('search')?.value;
    // Perform your search logic using the searchTerm
    this.onSearch(searchTerm);
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
  getPaginatedTasks(): Task[]  {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // return this.filteredTasks.slice(startIndex, endIndex);
    if(!this.filteredTasks){
    return this.tasks.slice(startIndex, endIndex);
    }
    else {
    return this.filteredTasks.slice(startIndex, endIndex);

    }
  }

  onSearch(term: string): void {
    if (term.trim() === '') {
      // If the search term is empty, reset the filtered tasks to all tasks
      this.filteredTasks = [...this.tasks];
    } else {
      // Filter tasks based on the search term
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.desc.toLowerCase().includes(term.toLowerCase()) ||
        task.Users.some(user => user.name.toLowerCase().includes(term.toLowerCase()))
      );
    }
    console.log(this.filteredTasks);
    
    // Reset the current page to 1 when performing a new search
    this.currentPage = 1;
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

  getButtonClass(status: string): any {
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
  getSortIcon(field: string): string {
    if (this.sortField === field) {
      return this.sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    }
    return 'fa-sort';
  }
}
