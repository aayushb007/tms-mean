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
