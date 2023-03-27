import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;
  constructor(
    private builder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]]
    })
  }

  login() {
    // user : {email: ...., pwd: ....}
    let user = this.loginForm.value;
    this.userService.login(user);
  }

}

