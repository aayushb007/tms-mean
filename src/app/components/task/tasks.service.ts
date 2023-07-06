import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../report/tasks.model';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  taskChanged = new Subject<Task[]>();
  taskSelected = new EventEmitter<Task>();
  userId!:string | null;
  task!:Task;
  constructor(private http:HttpClient) { }
  url = "http://localhost:3000/tasks"
   
  getTasks():Observable<Task[]>{
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    
    const user = this.userId !== null ? this.userId : '';
    console.log(user);
    
    return this.http.get<Task[]>(`${this.url}/user/${user}`).pipe(
        map((response: any) => {
          this.taskChanged.next(response.slice())
          return response;
        })
      );

}

searchTask(query:string){
  // this.userId = localStorage.getItem('id');
  // const user = this.userId !== null ? this.userId : '';
   return this.http
  .get(`${this.url}/search/?q=${query}`)
  // .pipe(
  //   map((response: any) => {
  //     this.taskChanged.next(response.slice())
  //     return response;
  //   })
  // );
}

  
}
