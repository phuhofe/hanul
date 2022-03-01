import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableTableComponent } from './receivable-table.component';

describe('ReceivableTableComponent', () => {
  let component: ReceivableTableComponent;
  let fixture: ComponentFixture<ReceivableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivableTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
