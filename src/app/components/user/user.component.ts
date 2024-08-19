import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { HttpEventType } from '@angular/common/http';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  playerService = inject(PlayerService);
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
            console.log(event.body);
          break;
        }
      },
      error: () => {

      }
    })
  }
}
