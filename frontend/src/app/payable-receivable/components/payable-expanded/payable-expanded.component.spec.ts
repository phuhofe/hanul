import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableExpandedComponent } from './payable-expanded.component';

describe('PayableExpandedComponent', () => {
  let component: PayableExpandedComponent;
  let fixture: ComponentFixture<PayableExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayableExpandedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayableExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
