import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAccountsSearchComponent } from './table-accounts-search.component';

describe('TableAccountsSearchComponent', () => {
  let component: TableAccountsSearchComponent;
  let fixture: ComponentFixture<TableAccountsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAccountsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAccountsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
