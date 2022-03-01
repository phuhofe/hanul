import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartProductComponent } from './mart-product.component';

describe('MartProductComponent', () => {
  let component: MartProductComponent;
  let fixture: ComponentFixture<MartProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MartProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
