import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feature } from '../../feature.model';
import { ReportService } from '../../report.service';
import { UserService } from 'src/app/components/user.service';

@Component({
  selector: 'app-create-feature',
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.css']
})
export class CreateFeatureComponent implements OnInit {
  feature!: Feature[];
  users!: any;
  featureForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private featService: ReportService, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.featureForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(200)]],
      status: ['', Validators.required],
      assignedUserId: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }


  getUser() {
    this.userService.getUsers().subscribe(
      (user) => {
        //  this.features  = feature;
        console.log(user);
        this.users = user
        //Array.isArray(feature) ? feature : [feature];
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching feature:', error);
      }
    )
  }
  onSubmit() {
    const newFeat = this.featureForm.value

    this.featService.addFeature(newFeat).subscribe(
      response => {
        console.log('Data inserted successfully!', response);
        // Handle the success case here
      },
      error => {
        console.error('Error inserting data:', error);
        // Handle the error case here
      }
    );
    // Process the form data here
    console.log(newFeat);
  }
}
