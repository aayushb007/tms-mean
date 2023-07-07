import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feature } from '../../feature.model';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  featureForm!: FormGroup;
  features!: Feature[];
  
  constructor(private formBuilder: FormBuilder,private featureService: ReportService) {}
 ngOnInit() {
    this.getFeature();
    this.featureForm = this.formBuilder.group({
      taskType: ['', Validators.required],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      feature_id: ['', Validators.required]
    });
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

  onSubmit(){
    const formValues = this.featureForm.value;
    this.featureService.setTask(formValues).subscribe(
      response => {
        console.log('Data inserted successfully!', response);
        // Handle the success case here
      },
      error => {
        console.error('Error inserting data:', error);
        // Handle the error case here
      }
    );
    
    
    

  }


}
