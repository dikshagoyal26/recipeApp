import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loginForm: FormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    class: 'modal-lg'
  };
  public cart: number = null
  constructor(public router: Router, public authService: AuthService, private modalService: BsModalService, private shoppingService: ShoppingService) {

    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required), ///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      password: new FormControl("", Validators.required)//^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$ //,Validators.minLength(6),
    })
  }

  ngOnInit(): void {
    this.shoppingService.length.subscribe((val) => {
      this.cart = val
    })
  }

  async loginUser() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      return;
    }
    let user: any = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    console.log(user)
    let status: any = await this.authService.loginUser(user)
    if (status == true) {
      this.loginForm.setValue({
        password: "",
        email: ""
      })
    }
    else {
      console.log({ status })
      // alert(status)
    }

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
