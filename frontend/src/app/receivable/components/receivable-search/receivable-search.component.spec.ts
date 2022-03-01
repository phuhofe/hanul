import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableSearchComponent } from './receivable-search.component';

describe('ReceivableSearchComponent', () => {
  let component: ReceivableSearchComponent;
  let fixture: ComponentFixture<ReceivableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivableSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
