import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagerTableComponent } from './customer-manager-table.component';

describe('CustomerManagerTableComponent', () => {
  let component: CustomerManagerTableComponent;
  let fixture: ComponentFixture<CustomerManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerManagerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
