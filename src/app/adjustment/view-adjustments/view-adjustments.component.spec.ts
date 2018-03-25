import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdjustmentsComponent } from './view-adjustments.component';

describe('ViewAdjustmentsComponent', () => {
  let component: ViewAdjustmentsComponent;
  let fixture: ComponentFixture<ViewAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
