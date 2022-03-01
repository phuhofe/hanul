import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPayableReceivableComponent } from './filter-payable-receivable.component';

describe('FilterPayableReceivableComponent', () => {
  let component: FilterPayableReceivableComponent;
  let fixture: ComponentFixture<FilterPayableReceivableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPayableReceivableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPayableReceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
