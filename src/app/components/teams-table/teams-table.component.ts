import { Router } from '@angular/router';
import { TeamService } from './../../services/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  teamsTab: any = [];

  constructor(
    private teamService: TeamService,
    private router: Router) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (response) => {
        this.teamsTab = response.teams;
      }
    );
  }

  deleteTeamById(x) {
    this.teamService.deleteById(x).subscribe(
      (response) => {
        console.log("Here response after delete", response.message);
        this.teamService.getAllTeams().subscribe(
          (response) => {
            this.teamsTab = response.teams;
          }
        );
      }
    );
  }

  goToTeamInfo(id) {
    this.router.navigate([`teamInfo/${id}`]);
  }

}
