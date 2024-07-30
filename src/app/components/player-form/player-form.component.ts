import { Component, OnInit, inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../interfaces/player.interface';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.sass'
})
export class PlayerFormComponent implements OnInit{
  private playerService: PlayerService = inject(PlayerService);

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    assists: new FormControl(0, Validators.required)
  });

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(console.log);
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.playerService.createPlayer(this.profileForm.value as Player).subscribe(event => {
      console.log(event.type);
      
      switch (event.type) {
        case HttpEventType.UploadProgress:
          console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes');
          break;
        case HttpEventType.Response:
          console.log('Finished uploading!');
          this.profileForm.reset();
          break;
      }
    });
  }
}
