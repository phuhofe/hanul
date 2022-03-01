import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablePageComponent } from './receivable-page.component';

describe('ReceivablePageComponent', () => {
  let component: ReceivablePageComponent;
  let fixture: ComponentFixture<ReceivablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivablePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
