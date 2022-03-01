import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteInventoryComponent } from './confirm-delete-inventory.component';

describe('ConfirmDeleteInventoryComponent', () => {
  let component: ConfirmDeleteInventoryComponent;
  let fixture: ComponentFixture<ConfirmDeleteInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
