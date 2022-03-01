import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNumbersComponent } from './order-numbers.component';

describe('OrderNumbersComponent', () => {
  let component: OrderNumbersComponent;
  let fixture: ComponentFixture<OrderNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
