import { MatchService } from './../../services/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  matchForm: FormGroup;
  match: any = {};
  matches: any = [];
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    // Get Id from Path
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.matchService.getMatchById(this.id).subscribe(
      (response) => {
        this.match = response.findedMatch;
      }
    )
  }

  editMatch() {
    console.log("Here new match object", this.match);
    this.matchService.editMatch(this.match).subscribe(
      (response) => {
        console.log("Here msg", response.message);
        this.router.navigate(["admin"]);
      }
    )
  }

}
