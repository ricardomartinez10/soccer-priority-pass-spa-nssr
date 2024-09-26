import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { AlertTypes } from './alert-soccer-types.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-soccer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-soccer.component.html',
  styleUrl: './alert-soccer.component.scss'
})
export class AlertSoccerComponent implements OnInit, OnChanges {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() show: boolean = false;
  public alertColor = signal('');

  constructor(){

  }

  ngOnInit(): void {
    this.setAlertColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue !== changes['type'].previousValue) {
      this.setAlertColor();
    }
  }

  setAlertColor() {
    switch (this.type) {
      case 'success':
        this.alertColor.set(AlertTypes.Success);
        break;
      case 'alert':
        this.alertColor.set(AlertTypes.Alert);
        break;
      case 'error':
        this.alertColor.set(AlertTypes.Error);
        break;
      default:
        this.alertColor.set(AlertTypes.Alert);
        break;
    }
  }
}
