import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableDataComponent } from './receivable-data.component';

describe('ReceivableDataComponent', () => {
  let component: ReceivableDataComponent;
  let fixture: ComponentFixture<ReceivableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivableDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
