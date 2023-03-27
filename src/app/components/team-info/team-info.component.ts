import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../../services/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  teamObj: any = {};
  id: any;
  constructor(
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.teamService.getTeamInfo(this.id).subscribe(
      (response) => {
        this.teamObj = response.team;
      }
    );
  }

}
