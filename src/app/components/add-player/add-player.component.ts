import { Router } from '@angular/router';
import { PlayerService } from './../../services/player.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup;
  player: any = {};
  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addPlayer() {
    this.playerService.addPlayer(this.player).subscribe(
      (data) => {
        console.log("Here response after adding", data.message);
        this.router.navigate(["admin"]);
      }
    );
  }

}
