import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { generateId } from 'src/app/shared/genericFunctions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Form Id
  signupForm: FormGroup;
  path: string;
  msgError: string;
  imagePreview: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    // Create Form Inputs By FormBuilder
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""]
    });
  }

  // Event Function
  signup() {
    console.log("Here user object", this.signupForm.value);
    this.signupForm.value.role = (this.path == "/subscription") ? "user" : "admin";
    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (response) => {
        console.log("Here message", response.message);
        if (response.message == "Error") {
          this.msgError = "Email Exist";
        } else {
          this.router.navigate(["signin"]);
        }
      }
    );
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here file", file);

    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
