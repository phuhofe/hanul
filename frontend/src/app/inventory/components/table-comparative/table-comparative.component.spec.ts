import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComparativeComponent } from './table-comparative.component';

describe('TableComparativeComponent', () => {
  let component: TableComparativeComponent;
  let fixture: ComponentFixture<TableComparativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComparativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComparativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
