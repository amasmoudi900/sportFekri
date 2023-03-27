import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  match: any = { scoreOne: 0, scoreTwo: 2, teamOne: "AA", teamTwo: "BB" }
  constructor() { }

  ngOnInit() {
  }

}
