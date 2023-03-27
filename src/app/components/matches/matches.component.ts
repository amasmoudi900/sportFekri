import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matchesTab: any = [];
  actualDate: any = new Date();
  title: string = "all matches";
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    // this.matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchService.getAllMatches().subscribe(
      (response) => {
        this.matchesTab = response.matches;
      }
    );
  }

  updateMatches(objs: any) {
    this.matchesTab = objs;
  }

}
