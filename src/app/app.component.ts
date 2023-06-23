import { Component } from '@angular/core';
import { UserService } from './components/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: UserService,private router:Router){}

  logout():void {
    this.authService.logout()
  }
  title = 'tms';
}
