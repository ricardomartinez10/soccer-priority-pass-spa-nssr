import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSoccerComponent } from './main-soccer.component';

describe('MainSoccerComponent', () => {
  let component: MainSoccerComponent;
  let fixture: ComponentFixture<MainSoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSoccerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
