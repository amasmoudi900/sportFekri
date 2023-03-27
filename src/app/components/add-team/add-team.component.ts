import { TeamService } from './../../services/team.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  // Form ID
  teamForm: FormGroup;
  // Object
  team: any = {};
  constructor(private teamService: TeamService) { }

  ngOnInit() {

  }
  // Event Function
  addTeam() {
    console.log("Here team object", this.team);
    this.teamService.addTeam(this.team).subscribe(
      (response) => {
        console.log("Here response after adding team", response.message);
      }

    );
  }


}
