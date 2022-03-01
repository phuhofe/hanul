import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldExpandedComponent } from './sold-expanded.component';

describe('SoldExpandedComponent', () => {
  let component: SoldExpandedComponent;
  let fixture: ComponentFixture<SoldExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldExpandedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
