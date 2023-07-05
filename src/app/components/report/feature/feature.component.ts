import { Component, OnInit } from '@angular/core';
import { Feature } from '../feature.model';
import { ReportService } from '../report.service';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent  implements OnInit{
  features!: Feature[];
  constructor(private featureService: ReportService) {}
 ngOnInit() {
    this.getFeature();
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

  
}
