import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = "http://localhost:3000/allUsers";
  public token: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;

  private name: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  isUserAuth() {
    return this.isUserAuthenticated;
  }

  getName() {
    return this.name;
  }

  signup(obj, img: File) {
    let formData = new FormData();
    formData.append("firstName", obj.firstName);
    formData.append("lastName", obj.lastName);
    formData.append("email", obj.email);
    formData.append("pwd", obj.pwd);
    formData.append("img", img);
    return this.http.post<{ message: string }>(this.userUrl + "/subscription", formData);
  }
  editProfile(newUser) {
    return this.http.put(this.userUrl, newUser);
  }

  // Login method 
  login(user) {
    this.http.post<{ user: any, message: string }>(this.userUrl + "/signin", user).subscribe(
      (res) => {
        const token = res.user.jwt;
        this.token = token;
        if (res.user) {
          this.isUserAuthenticated = true;
          this.name = res.user.firstName + " " + res.user.lastName;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('name', this.name);
          (res.user.role == "admin") ?
            this.router.navigate(['admin']) :
            this.router.navigate(['']);
        }
      }
    )
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

}