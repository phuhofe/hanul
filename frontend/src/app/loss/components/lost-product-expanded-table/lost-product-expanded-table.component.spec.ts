import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostProductExpandedTableComponent } from './lost-product-expanded-table.component';

describe('LostProductExpandedTableComponent', () => {
  let component: LostProductExpandedTableComponent;
  let fixture: ComponentFixture<LostProductExpandedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostProductExpandedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostProductExpandedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
