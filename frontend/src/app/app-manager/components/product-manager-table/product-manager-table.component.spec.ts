import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerTableComponent } from './product-manager-table.component';

describe('ProductManagerTableComponent', () => {
  let component: ProductManagerTableComponent;
  let fixture: ComponentFixture<ProductManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
