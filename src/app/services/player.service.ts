import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player.interface';
import { PlayerRequest } from '../interfaces/player-request.interface';
import { Observable } from 'rxjs';
import { PlayerRequestResponse } from '../interfaces/player-request-response';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  //baseUrl = 'http://localhost:3000';
  baseUrl = 'https://soccer-priority-pass-back.onrender.com';
  getPlayersUrl = `${this.baseUrl}/players`;
  createPlayerUrl = `${this.baseUrl}/create-player`;
  playerRequestUrl = `${this.baseUrl}/player-request`;
  subscribedPlayers = `${this.baseUrl}/player-request`;
  updateConfirmedPlayersUrl = `${this.baseUrl}/update-player-confirmed`;
  updatePlayerAssistsUrl = `${this.baseUrl}/update-player-assists`;


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
