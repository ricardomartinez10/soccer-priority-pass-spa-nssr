import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { PlayerRequestComponent } from './components/player-request/player-request.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerFormComponent, PlayerRequestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'soccer-squad-spa';
}
