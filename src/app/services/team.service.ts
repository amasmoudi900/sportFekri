import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamUrl: string = "http://localhost:3000/teams";
  constructor(private http: HttpClient) { }

  addTeam(teamObj) {
    return this.http.post<{ message: string }>(this.teamUrl, teamObj);
  }

  getAllTeams() {
    return this.http.get<{ teams: any }>(this.teamUrl);
  }

  deleteById(id) {
    return this.http.delete<{ message: string }>(`${this.teamUrl}/${id}`);
  }

  getTeamInfo(x) {
    return this.http.get<{ team: any }>(`${this.teamUrl}/${x}`);
  }
}
