import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../../report/tasks.model';
import { Feature } from '../../report/feature.model';

import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../report/report.service';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  id!: number;
  userId!:string | null  ;
  features!: Feature[];
  taskId!: number;
  task!: any;
  startDate!:any;
  
  dueDate!:any;
  editForm!: FormGroup;
  statusOptions: string[] = ['Pending', 'Inprogress', 'Testing', 'Completed'];
  taskType:string[] = ['Task','Bug'];
  constructor(private route: ActivatedRoute,
    private taskService: TasksService,
    private router: Router,
    private featureService: ReportService) {
  }
  ngOnInit(): void {
    this.getFeature();
    console.log('Edit Component called');

    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId'];

        this.initForm();

      }
    )
  }
  getFeature() {
    this.featureService.getFeature().subscribe(
       (feature) => {
       //  this.features  = feature;
         console.log(feature); 
         this.features = Array.isArray(feature) ? feature : [feature];
       console.log(feature);
       },
       (error) => {
         console.error('Error fetching feature:', error);
       }
     );
   }
 
  private initForm() {
    let taskType ='';
    let title = '';
    let desc = '';
    let startDate;
    let dueDate;
    let status = '';
    let subtask;
    let FeatureId;

    this.taskService.getTaskDetail(this.taskId).subscribe(task => {
      var datePipe = new DatePipe('en-US');
      this.startDate =  datePipe.transform(task.startDate, 'yyyy-MM-dd');
        
      this.dueDate =  datePipe.transform(task.dueDate, 'yyyy-MM-dd');
      console.log(task);
       
       
      this.task = task;

    })
    this.editForm = new FormGroup({
      'taskType': new FormControl(taskType,Validators.required),
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'startDate': new FormControl(startDate, Validators.required),
      'dueDate': new FormControl(dueDate, Validators.required),
      'status': new FormControl(status, Validators.required),
      'feature_id': new FormControl(FeatureId,Validators.required)
    })
  }

  onSubmit() {
    this.userId = localStorage.getItem('id');
    const user = this.userId !== null ? this.userId : '';
    const formValues = this.editForm.value;
    this.taskService.editTask(this.taskId,formValues).subscribe(
      (next)=>{
        console.log(next);
        this.taskService.getTasks().subscribe(res =>{

          console.log('Response after Update',res);

          this.taskService.taskChanged.next(res);
          alert('Task Updated!')
          
        })
        
      }
    );
  
    
    

  }
  
}
