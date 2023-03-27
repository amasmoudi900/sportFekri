import { ActivatedRoute } from '@angular/router';
import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

  id: any;
  player: any;
  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.playerService.getPlayerById(this.id).subscribe(
      (data) => {
        console.log("Here data from BE", data);
        
        this.player = data.player;
      }
    )
  }

}
