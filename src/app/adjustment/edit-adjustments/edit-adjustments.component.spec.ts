import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdjustmentsComponent } from './edit-adjustments.component';

describe('EditAdjustmentsComponent', () => {
  let component: EditAdjustmentsComponent;
  let fixture: ComponentFixture<EditAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
