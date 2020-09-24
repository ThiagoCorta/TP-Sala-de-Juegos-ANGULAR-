import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepongComponent } from './gamepong.component';

describe('GamepongComponent', () => {
  let component: GamepongComponent;
  let fixture: ComponentFixture<GamepongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamepongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
