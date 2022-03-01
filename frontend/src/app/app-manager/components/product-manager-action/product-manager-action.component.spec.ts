import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerActionComponent } from './product-manager-action.component';

describe('ProductManagerActionComponent', () => {
  let component: ProductManagerActionComponent;
  let fixture: ComponentFixture<ProductManagerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagerActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
