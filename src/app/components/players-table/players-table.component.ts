import { Router } from '@angular/router';
import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  playersTab: any = [];
  constructor(
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
    this.playerService.getAllPlayers().subscribe(
      (response) => {
        this.playersTab = response.players;
      }
    )
  }

  goToPlayer(id) {
    this.router.navigate([`playerInfo/${id}`]);
  }

}
