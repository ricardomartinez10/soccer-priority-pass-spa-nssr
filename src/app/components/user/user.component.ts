import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { HttpEventType } from '@angular/common/http';
import { Game } from '../../interfaces/game.interface';
import { of } from 'rxjs';
import { AlertSoccerComponent } from '../alert-soccer/alert-soccer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AlertSoccerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  playerService = inject(PlayerService);
  popOverInfo = {
    text: 'Game and player status updated!',
    type: 'success',
    show: false
  }
  gameForm = new FormGroup(
    {
      date: new FormControl(
        '',
        Validators.required
      )
    }
  );


  onSubmitGame() {    
    const game: Game = {
      date: this.gameForm.value.date || ''
    } 
    
    this.playerService.updateGameDate(game).subscribe({
      next: (event) => {
        switch(event.type) {
          case HttpEventType.Response:
            this.popOverInfo.show = true;
            this.gameForm.reset();

            setTimeout(() => {
              this.popOverInfo.show = false;
            }, 3000);
          break;
        }
      },
      error: () => {

      }
    });
  }
}
