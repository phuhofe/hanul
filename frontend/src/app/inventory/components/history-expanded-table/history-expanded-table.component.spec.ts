import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExpandedTableComponent } from './history-expanded-table.component';

describe('HistoryExpandedTableComponent', () => {
  let component: HistoryExpandedTableComponent;
  let fixture: ComponentFixture<HistoryExpandedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryExpandedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryExpandedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
