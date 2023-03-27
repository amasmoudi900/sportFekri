import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {

  matches: any = [];
  age: number = 90;

  constructor(
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchService.getAllMatches().subscribe(
      (response) => {
        this.matches = response.matches;
      }
    );
  }

  calcul(a, b) {
    return a + b;
  }

  displayMatch(x: number) {
    this.router.navigate([`matchInfo/${x}`]);
  }
  goToEdit(id: number) {
    this.router.navigate([`editMatch/${id}`]);
  }
  deleteMatch(x: number) {
    this.matchService.deleteMatchById(x).subscribe(
      (response) => {
        console.log("Here response after delete", response.message);
        this.matchService.getAllMatches().subscribe(
          (response) => {
            this.matches = response.matches;
          }
        );
      }
    );
  }

}
