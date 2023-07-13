import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
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
  taskChanged = new Subject<Task[]>();
  taskSelected = new EventEmitter<Task>();
  getFeature(): Observable<Feature> {
    let userId = localStorage.getItem('id');
    console.log(userId);
    return this.http.get<Feature>(`${this.apiFeat}/user/${userId}`);
  }

  getTask(): Observable<Task> {
    return this.http.get<Task>(`${this.apiTask}`).pipe(
      map((response: any) => {
        this.taskChanged.next(response.slice())
        return response;
      })
    );;
  }

  getSearchTask(query: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiTask}/search/?query=${query}`).pipe(
      map((response: any) => {
        this.taskChanged.next(response.slice())
        return response;
      })
    );
  }

  getBug(): Observable<Task> {
    return this.http.get<Task>(`${this.apiTask}/bug/1`);
  }

  getFeatureBug(): Observable<any> {
    return this.http.get(`${this.apiFeat}/bug/sub`);

  }

  setTask(task: any) {
    console.log(task);

    return this.http
      .post(`${this.apiTask}`, task);

  }

  addDependentTask(task: any) {
    console.log(task);
    return this.http.post(`${this.apiDeTask}`, task);

  }

  addSubTask(task: any) {
    console.log(task);
    return this.http.post(`${this.apiSTask}`, task);

  }

  addFeature(feature: Feature) {
    console.log(feature);
    return this.http
      .post(`${this.apiFeat}`, feature);
  }
}
