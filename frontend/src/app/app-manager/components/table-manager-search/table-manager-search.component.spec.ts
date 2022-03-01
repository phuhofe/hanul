import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableManagerSearchComponent } from './table-manager-search.component';

describe('TableManagerSearchComponent', () => {
  let component: TableManagerSearchComponent;
  let fixture: ComponentFixture<TableManagerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableManagerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableManagerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
