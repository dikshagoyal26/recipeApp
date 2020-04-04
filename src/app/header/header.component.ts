import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loginForm:FormGroup; 
  constructor(public router:Router,private authService:AuthService) { 
    this.loginForm=new FormGroup({
      email: new FormControl("",Validators.required), ///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      password:new FormControl("",Validators.required)//^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$ //,Validators.minLength(6),
    })
  }

  ngOnInit(): void {
  }

  loginUser(){
    console.log(this.loginForm)
    if(this.loginForm.invalid){
      return;
    }
    let user:any={
      email:this.loginForm.controls.email.value,
      password:this.loginForm.controls.password.value
    }
    console.log(user)
    this.authService.loginUser(user)
  }
}
