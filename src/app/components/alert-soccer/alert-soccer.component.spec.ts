import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSoccerComponent } from './alert-soccer.component';

describe('AlertSoccerComponent', () => {
  let component: AlertSoccerComponent;
  let fixture: ComponentFixture<AlertSoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertSoccerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
