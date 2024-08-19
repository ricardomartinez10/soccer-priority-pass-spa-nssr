import { Component, EventEmitter, inject, OnInit, Output, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { PlayerRequest } from '../../interfaces/player-request.interface';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { equivalentValidator } from '../validators/equivalent-validator';
import { Player } from '../../interfaces/player.interface';
import { CountdownComponent, CountdownEvent, CountdownModule } from 'ngx-countdown';
import moment, { Moment } from 'moment';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-player-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CountdownModule, CountdownComponent],
  templateUrl: './player-request.component.html',
  styleUrl: './player-request.component.scss',
})
export class PlayerRequestComponent implements OnInit {
  private playerSevice: PlayerService = inject(PlayerService);
  subscribedPlayers: WritableSignal<Array<Player>> = signal([]); 
  subscribedKeepers: WritableSignal<Array<Player>> = signal([]);
  @Output() initSoccerballAnimation = new EventEmitter<boolean>();
  maxPlayers = 18;
  maxKeepers = 2;
  loadingRequest: WritableSignal<boolean> = signal(false);
  playerAlreadySubscribed: WritableSignal<boolean> = signal(false);
  playerSuccessfullySubscribed: WritableSignal<boolean> = signal(false);;
  closeForm = signal(false);
  formCloseDate?: Moment;
  now?: Moment;
  diffInSecs: WritableSignal<number> = signal(0);
  dateFormat?: string;

  playerRequestForm = new FormGroup(
    {
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      repeatEmail: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
    },
    {
      validators: [equivalentValidator('email', 'repeatEmail')],
    }
  );

  ngOnInit(): void {
    this.getGameDetails();
    this.getSubscribedPlayers();
  }

  setFormTime(date: string, dateFormat: string) {
    this.formCloseDate = moment(date, dateFormat);
    this.now = moment();
    this.diffInSecs?.set(this.formCloseDate.diff(this.now, 'seconds'));
    this.dateFormat = this.diffInSecs() < 86400 ?
      'HH:mm:ss' :
      'd:HH:m:s'
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.closeForm.set(true);
    }
  }

  getConfirmedPlayersEmail(): Array<String> {
    return this.subscribedKeepers()
      .concat(this.subscribedPlayers())
      .slice(0, this.maxKeepers + this.maxPlayers)
      .map(player => player.email);
  }

  getSubscribedPlayers() {
    this.playerSevice.getSusbscribedPlayers().subscribe({
      next: (players) => {        
        this.subscribedPlayers.set(players.priorityPlayers);
        this.subscribedKeepers.set(players.priorityKeepers);
      },
    });
  }

  getGameDetails() {
    this.playerSevice.getGameDetails().subscribe({
      next: (details: Game) => {
        this.setFormTime(details.date, details.dateFormat || '');
      }
    })
  }

  updateConfirmedPlayers() {
    this.playerSevice.updateConfirmedPlayers(this.getConfirmedPlayersEmail()).subscribe({
      next: (response ) => {
        console.log('successfull', response);
      },
      error: (error) => {
        console.log('erorr', error);

      }
    })
  }

  updatePlayerAssists() {
    this.playerSevice.updatePlayerAssists().subscribe({
      next: (response ) => {
        console.log('successfull', response);
      },
      error: (error) => {
        console.log('erorr', error);

      }
    })
  }

  onSubmitRequest(event: Event) {
    event.preventDefault();
    this.loadingRequest.set(true);
    const playerRequest: PlayerRequest = {
      email: this.playerRequestForm.controls['email'].value || '',
    };

    this.playerSevice.playerRequest(playerRequest).subscribe({
      next: (event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            break;
          case HttpEventType.Response:
            this.initSoccerballAnimation.emit(true);
            this.playerSuccessfullySubscribed.set(true);
            this.playerRequestForm.reset();
            this.loadingRequest.set(false);
            this.getSubscribedPlayers();

            setTimeout(() => {
              this.playerSuccessfullySubscribed.set(false);
            }, 2000);
            break;
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 409) {
          this.playerAlreadySubscribed.set(true);
          this.playerRequestForm.reset();
          this.loadingRequest.set(false);

          setTimeout(() => {
            this.playerAlreadySubscribed.set(false);
          }, 2000);
        }
      },
    });
  }
}
