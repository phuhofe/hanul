import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesTableComponent } from './receivables-table.component';

describe('ReceivablesTableComponent', () => {
  let component: ReceivablesTableComponent;
  let fixture: ComponentFixture<ReceivablesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivablesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivablesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
