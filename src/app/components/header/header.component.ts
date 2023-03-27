import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  user: any;
  private authListenerSubs: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.userService.getName();
      }
    )
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }

}
