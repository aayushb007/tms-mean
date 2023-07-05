import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feature } from './feature.model';
import { Task } from './tasks.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiFeat = 'http://localhost:3000/features'; 
  private apiTask = 'http://localhost:3000/tasks'
  constructor(private http: HttpClient) { }

  getFeature(): Observable<Feature> {
    return this.http.get<Feature>(`${this.apiFeat}/user/1`); 
  }

  getTask(): Observable<Task> {
    return this.http.get<Task>(`${this.apiTask}`); 
  }

  getBug(): Observable<Task> {
    return this.http.get<Task>(`${this.apiTask}/bug/1`); 
  }

  addFeature(feature:Feature){
    console.log(feature);
    return this.http
    .post(`${this.apiFeat}`, feature); 
  }
}
