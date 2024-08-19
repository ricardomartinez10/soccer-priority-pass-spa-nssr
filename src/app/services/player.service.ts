import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player.interface';
import { PlayerRequest } from '../interfaces/player-request.interface';
import { Observable } from 'rxjs';
import { PlayerRequestResponse } from '../interfaces/player-request-response';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  //baseUrl = 'http://localhost:3000';
  baseUrl = 'https://soccer-priority-pass-back.onrender.com';
  private getPlayersUrl = `${this.baseUrl}/players`;
  private createPlayerUrl = `${this.baseUrl}/create-player`;
  private playerRequestUrl = `${this.baseUrl}/player-request`;
  private subscribedPlayers = `${this.baseUrl}/player-request`;
  private updateConfirmedPlayersUrl = `${this.baseUrl}/update-player-confirmed`;
  private updatePlayerAssistsUrl = `${this.baseUrl}/update-player-assists`;
  private getGameDetailsUrl = `${this.baseUrl}/game-details`;
  private updateGameDateUrl = `${this.baseUrl}/update-game-date`;


  constructor(private http: HttpClient) { }

  getPlayers(): Observable<[Player]> {
    return this.http.get<[Player]>(this.getPlayersUrl);
  }

  getSusbscribedPlayers() {
    return this.http.get<PlayerRequestResponse>(this.subscribedPlayers);
  }

  updateConfirmedPlayers(confirmedPlayers: Array<String>) {
    return this.http.put<[String]>(this.updateConfirmedPlayersUrl, confirmedPlayers , {
      observe: 'events'
    });
  };

  updatePlayerAssists() {
    return this.http.put<[String]>(this.updatePlayerAssistsUrl, {
      observe: 'events'
    });
  };

  getGameDetails() {
    return this.http.get<Game>(this.getGameDetailsUrl);
  }

  updateGameDate(date: Game) {
    return this.http.post<Game>(this.updateGameDateUrl, date, {
      observe: 'events'
    });
  }

  createPlayer(player: Player) {
    return this.http.post<Player>(this.createPlayerUrl, player, {
      reportProgress: true,
      observe: 'events',
    })
  }

  playerRequest(playerRequest: PlayerRequest) {
    return this.http.post<PlayerRequest>(this.playerRequestUrl, playerRequest, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
