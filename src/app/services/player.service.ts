import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerUrl: string = "http://localhost:3000/players";
  constructor(private http: HttpClient) { }

  addPlayer(player) {
    return this.http.post<{ message: string }>(this.playerUrl, player);
  }
  editPlayer(player) {
    return this.http.put(this.playerUrl, player);
  }
  deletePlayer(id) {
    return this.http.delete(`${this.playerUrl}/${id}`);
  }
  getPlayerById(id) {
    return this.http.get<{ player: any }>(`${this.playerUrl}/${id}`);
  }
  getAllPlayers() {
    return this.http.get<{ players: any }>(this.playerUrl);
  }
}
