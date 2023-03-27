import { MatchService } from './../../services/match.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { generateId } from 'src/app/shared/genericFunctions';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  // Form ID
  matchForm: FormGroup;
  // Object
  match: any = {};
  x: number = 10;
  constructor(
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {

  }
  // Event Function
  addMatch() {
    console.log("Here match object", this.match);
    // Apl Service => addMatch(this.match)
    this.matchService.addMatch(this.match).subscribe(
      (response) => {
        console.log("Here response from BE", response);
        this.router.navigate(["allMatches"]);
      }
    );
  }



}
