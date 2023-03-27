import { WeatherComponent } from './components/weather/weather.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchesComponent } from './components/matches/matches.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // http://localhost:4200 => Home component will be displayed
  { path: "", component: HomeComponent },
  // http://localhost:4200/signin => Login component will be displayed
  { path: "signin", component: LoginComponent },
  // http://localhost:4200/subscription => Signup component will be displayed
  { path: "subscription", component: SignupComponent },
  { path: "signupAdmin", component: SignupComponent },
  { path: "allMatches", component: MatchesComponent },
  { path: "players", component: PlayersComponent },
  { path: "addMatch", component: AddMatchComponent },
  { path: "addTeam", component: AddTeamComponent },
  { path: "addPlayer", component: AddPlayerComponent },
  { path: "admin", component: AdminComponent },
  // :id => ID is a param
  { path: "matchInfo/:id", component: MatchInfoComponent },
  { path: "editMatch/:id", component: EditMatchComponent },
  { path: "playerInfo/:id", component: PlayerInfoComponent },
  { path: "teamInfo/:id", component: TeamInfoComponent },
  { path: "profile", component: ProfileComponent },
  { path: "weather", component: WeatherComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
