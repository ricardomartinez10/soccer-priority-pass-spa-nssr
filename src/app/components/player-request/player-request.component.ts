import { Component, inject, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-player-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CountdownModule, CountdownComponent],
  templateUrl: './player-request.component.html',
  styleUrl: './player-request.component.scss',
})
export class PlayerRequestComponent implements OnInit {
  private playerSevice: PlayerService = inject(PlayerService);
  subscribedPlayers: Array<Player> = [];
  subscribedKeepers: Array<Player> = [];
  maxPlayers = 18;
  maxKeepers = 2;
  loadingRequest: boolean = false;
  playerAlreadySubscribed = false;
  playerSuccessfullySubscribed = false;
  closeForm = signal(false);
  formCloseDate?: Moment;
  now?: Moment;
  diffInSecs?:number
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
    this.setFormTime();
    this.getSubscribedPlayers();
  }

  setFormTime() {
    this.formCloseDate = moment('07/08/2024 19:00:00', "DD/MM/YYYY HH:mm:ss");
    this.now = moment();
    this.diffInSecs = this.formCloseDate.diff(this.now, 'seconds');
    this.dateFormat = this.diffInSecs < 86400 ?
      'HH:mm:ss' :
      'd:HH:m:s'
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.closeForm.set(true);
    }
  }

  getConfirmedPlayersEmail(): Array<String> {
    return this.subscribedKeepers
      .concat(this.subscribedPlayers)
      .slice(0, this.maxKeepers + this.maxPlayers)
      .map(player => player.email);
  }

  getSubscribedPlayers() {
    this.playerSevice.getSusbscribedPlayers().subscribe({
      next: (players) => {        
        this.subscribedPlayers = players.priorityPlayers;
        this.subscribedKeepers = players.priorityKeepers;
      },
    });
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
    this.loadingRequest = true;
    const playerRequest: PlayerRequest = {
      email: this.playerRequestForm.controls['email'].value || '',
    };

    this.playerSevice.playerRequest(playerRequest).subscribe({
      next: (event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            break;
          case HttpEventType.Response:
            this.playerSuccessfullySubscribed = true;
            this.playerRequestForm.reset();
            this.loadingRequest = false;

            setTimeout(() => {
              this.playerSuccessfullySubscribed = false;
            }, 2000);
            break;
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 409) {
          this.playerAlreadySubscribed = true;
          this.playerRequestForm.reset();
          this.loadingRequest = false;

          setTimeout(() => {
            this.playerAlreadySubscribed = false;
          }, 2000);
        }
      },
    });
  }
}
