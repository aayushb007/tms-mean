import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000/user"
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient,private router:Router,jwtHelper: JwtHelperService) { }
  
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getId() {
    if(localStorage.getItem('token')){
      const token = this.getToken();
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.user_id;
      console.log(userId);
      return userId;
      }
      
    }
  

  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.router.navigate(['/login'])

  }

  register(name: string, email: string, password: string) : Observable<any> {
    const userData = { name, email, password };
    return this.http.post(`${this.url}/register`, userData)
    // .subscribe(
    //   () => {
    //     console.log('Registration successful!');
       
    //   },
    //   error => {
    //     console.error('Registration failed:', error);
       
    //   }
    // );
  }

  login(email: string, password: string): Observable<any>  {
    const credentials = { email, password };
   return this.http.post(`${this.url}/login`, credentials)
    // .subscribe(
    //   () => {
    //     console.log('Login successful!');
        
    //   },
    //   error => {
    //     console.error('Login failed:', error);
    //       }
    // );
  }
}
