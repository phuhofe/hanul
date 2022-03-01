import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceSearchComponent } from './finance-search.component';

describe('FinanceSearchComponent', () => {
  let component: FinanceSearchComponent;
  let fixture: ComponentFixture<FinanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
