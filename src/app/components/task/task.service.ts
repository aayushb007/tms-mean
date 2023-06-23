import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task.model'
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskChanged = new Subject<Task[]>();
  taskSelected = new EventEmitter<Task>();
  task!:Task[];
  constructor(private http:HttpClient) { }
  url = "http://localhost:3000/task"

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.url}`).pipe(
        map((response: any) => {
          this.taskChanged.next(response.slice())
          return response;
        })
      );

}


   getTaskDetail(id:string):Observable<Task>{
    console.log("Hello this is Get User",id);
    
    return this.http.get<Task>(`${this.url}/${id}`).pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
   }
  addTask(task : Task) {
    console.log(task);
    return this.http
    .post(`${this.url}`, task); 
    
  }
  updateTask(_id: string, newTask: Task){
    return this.http
    .put(`${this.url}/${_id}`, newTask);
    // .subscribe((response) => {
      
    //   return response});

   
  }

  deleteTask(_id: string){
    return this.http
    .delete(`${this.url}/${_id}`);
  }

}