import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFilerTableComponent } from './order-filer-table.component';

describe('OrderFilerTableComponent', () => {
  let component: OrderFilerTableComponent;
  let fixture: ComponentFixture<OrderFilerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFilerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFilerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
