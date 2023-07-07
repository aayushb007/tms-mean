import { Component } from '@angular/core';
import { ReportService } from '../../report.service';
import { Feature, Task } from '../../feature.model';

@Component({
  selector: 'app-list-bug',
  templateUrl: './list-bug.component.html',
  styleUrls: ['./list-bug.component.css']
})
export class ListBugComponent {
 features!: any[];
  constructor(private taskService: ReportService) {}
  ngOnInit() {
   this.getTask();
 }
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

  getTask() {
      this.taskService.getFeatureBug().subscribe(
        (res)=>{
           this.features= res;
        },
        (error)=>{
          console.log(error);
          
        }
      );
      
    
  }
}
