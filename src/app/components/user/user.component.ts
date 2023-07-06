import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginForm!: FormGroup;
  er!: string;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/all-tasks'])

    }
    this.initForm()
  }

  private initForm() {
    let email = '';
    let password = '';
    this.loginForm = new FormGroup({
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required),

    })
    console.log(this.loginForm);

  }
  onSubmit() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    console.log('yo', email, password);
    this.userService.login(email, password).subscribe(res => {
      const token = res.token;
      const user = res.user
      localStorage.setItem('token', token);
      localStorage.setItem('name', user.name);
      localStorage.setItem('id', user.id);
      this.router.navigate(['/all-tasks'])

    },
      err => {
        console.log('Error', err.error);
        this.er = err.error.error;
      });


  }
}
