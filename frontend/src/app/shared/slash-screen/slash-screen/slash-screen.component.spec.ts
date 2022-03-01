import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlashScreenComponent } from './slash-screen.component';

describe('SlashScreenComponent', () => {
  let component: SlashScreenComponent;
  let fixture: ComponentFixture<SlashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlashScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
