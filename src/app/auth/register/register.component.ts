import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(public router: Router, private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      cpassword: new FormControl("", Validators.required),
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }
    let user: {} = {
      // name:this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }
    // console.log(user)
    this.authService.registerUser(user)
  }
}
