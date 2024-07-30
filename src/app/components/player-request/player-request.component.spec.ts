import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRequestComponent } from './player-request.component';

describe('PlayerRequestComponent', () => {
  let component: PlayerRequestComponent;
  let fixture: ComponentFixture<PlayerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
