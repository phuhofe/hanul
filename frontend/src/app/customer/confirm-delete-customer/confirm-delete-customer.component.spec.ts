import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCustomerComponent } from './confirm-delete-customer.component';

describe('ConfirmDeleteCustomerComponent', () => {
  let component: ConfirmDeleteCustomerComponent;
  let fixture: ComponentFixture<ConfirmDeleteCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
