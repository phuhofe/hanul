import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeCostPriceTableComponent } from './comparative-cost-price-table.component';

describe('ComparativeCostPriceTableComponent', () => {
  let component: ComparativeCostPriceTableComponent;
  let fixture: ComponentFixture<ComparativeCostPriceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativeCostPriceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeCostPriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
