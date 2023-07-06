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
  private apiTask = 'http://localhost:3000/tasks';
  private apiDeTask = 'http://localhost:3000/dependent-tasks';
  private apiSTask = 'http://localhost:3000/sub-tasks';
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

  getFeatureBug():Observable<any>{
    return this.http.get(`${this.apiFeat}/sub/bug`); 
    
  }

  setTask(task:any){
    console.log(task);
    
    return this.http
    .post(`${this.apiTask}`, task);
    
  }

  addDependentTask(task:any){
    console.log(task);
    return this.http.post(`${this.apiDeTask}`,task);
    
  }

  addSubTask(task:any){
    console.log(task);
    return this.http.post(`${this.apiSTask}`,task);
    
  }

  addFeature(feature:Feature){
    console.log(feature);
    return this.http
    .post(`${this.apiFeat}`, feature); 
  }
}
