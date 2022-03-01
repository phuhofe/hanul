import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldTableComponent } from './sold-table.component';

describe('SoldTableComponent', () => {
  let component: SoldTableComponent;
  let fixture: ComponentFixture<SoldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
