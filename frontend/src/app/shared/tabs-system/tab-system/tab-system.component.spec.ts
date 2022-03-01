import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSystemComponent } from './tab-system.component';

describe('TabSystemComponent', () => {
  let component: TabSystemComponent;
  let fixture: ComponentFixture<TabSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
