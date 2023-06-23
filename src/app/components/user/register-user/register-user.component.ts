import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
      registerForm!:FormGroup;
      constructor(private userService:UserService){}
      ngOnInit(): void {
        this.initForm()
      }

      private initForm(){
        let name = '';
        let email = '';
        let password = '';
      this.registerForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'email': new FormControl(email, Validators.required),
        'password':new FormControl(password, Validators.required),
        
      })
      console.log(this.registerForm);
      
    }
  onSubmit(){
    const name = this.registerForm.value['name'];
    const email = this.registerForm.value['email'];
    const password = this.registerForm.value['password'];
    console.log('yo',name,email,password);
    this.userService.register(name,email,password).subscribe(
      response => {
        console.log(response.message);
      },
      error => {
        console.log('Registration failed:', error);
      }
    );
    

  }
}
