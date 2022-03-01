import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPricePageComponent } from './cost-price-page.component';

describe('CostPricePageComponent', () => {
  let component: CostPricePageComponent;
  let fixture: ComponentFixture<CostPricePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostPricePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPricePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
