import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-player-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CountdownModule, CountdownComponent],
  templateUrl: './player-request.component.html',
  styleUrl: './player-request.component.sass',
})
export class PlayerRequestComponent implements OnInit {
  private playerSevice: PlayerService = inject(PlayerService);
  subscribedPlayers: Array<Player> = [];
  subscribedKeepers: Array<Player> = [];
  maxPlayers = 3;
  maxKeepers = 2;
  loadingRequest: boolean = false;
  playerAlreadySubscribed = false;
  playerSuccessfullySubscribed = false;
  closeForm = false;

  playerRequestForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
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
    this.getSubscribedPlayers();
  }

  handleEvent(e: CountdownEvent) {
    console.log(e);
    
    if (e.action === 'done') {
      this.closeForm = true;
    }
  }

  getSubscribedPlayers() {
    this.playerSevice.getSusbscribedPlayers().subscribe({
      next: (players) => {        
        this.subscribedPlayers = players.priorityPlayers;
        this.subscribedKeepers = players.priorityKeepers;
      },
    });
  }

  onSubmitRequest(event: Event) {
    event.preventDefault();
    const playerRequest: PlayerRequest = {
      name: this.playerRequestForm.controls['name'].value || '',
      email: this.playerRequestForm.controls['email'].value || '',
    };

    this.playerSevice.playerRequest(playerRequest).subscribe({
      next: (event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            console.log(
              'Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes'
            );
            break;
          case HttpEventType.Response:
            console.log('Finished uploading!');
            this.playerSuccessfullySubscribed = true;
            this.playerRequestForm.reset();
            this.getSubscribedPlayers();

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

          setTimeout(() => {
            this.playerAlreadySubscribed = false;
          }, 2000);
        }
      },
    });
  }
}
