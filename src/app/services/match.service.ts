import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {


  // Server BE Address
  matchUrl: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) { }

  // Request to Add Match
  // Response : message
  addMatch(obj) {
    return this.httpClient.post<{ message: string, isAdded: boolean }>(this.matchUrl, obj);
  }

  // Request to get All Matches
  // Response : [{}, {} ....]
  getAllMatches() {
    return this.httpClient.get<{ matches: any, message: string }>(this.matchUrl);
  }

  // Request to get match By Id
  // Response : {}
  getMatchById(id) {
    return this.httpClient.get<{ findedMatch: any }>(`${this.matchUrl}/${id}`);
  }

  // Request to delete match By Id
  // Response : message
  deleteMatchById(id) {
    return this.httpClient.delete<{ message: string }>(`${this.matchUrl}/${id}`);
  }


  // Request to update match By Id
  // Response : message
  editMatch(newObj) {
    return this.httpClient.put<{ message: string }>(this.matchUrl, newObj);
  }

  searchMatchesByScores(obj) {
    return this.httpClient.post<{ matches: any }>(this.matchUrl + "/search", obj);
  }


}
