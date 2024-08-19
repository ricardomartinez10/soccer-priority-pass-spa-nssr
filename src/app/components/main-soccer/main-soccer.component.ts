import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, viewChild } from '@angular/core';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { PlayerRequestComponent } from '../player-request/player-request.component';

@Component({
  selector: 'app-main-soccer',
  standalone: true,
  imports: [PlayerFormComponent, PlayerRequestComponent],
  templateUrl: './main-soccer.component.html',
  styleUrl: './main-soccer.component.scss'
})
export class MainSoccerComponent implements OnInit{
  soccerBallIcon = viewChild.required<ElementRef>('soccerBallIcon');

  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    
  }

  initSoccerballAnimation(shouldRunAnimation: boolean) {
    if (shouldRunAnimation) {
      this.renderer.addClass(this.soccerBallIcon().nativeElement, 'soccer-animation');

      setTimeout(() => {
        this.renderer.removeClass(this.soccerBallIcon().nativeElement, 'soccer-animation');
      }, 4000);
    }
  }
}
