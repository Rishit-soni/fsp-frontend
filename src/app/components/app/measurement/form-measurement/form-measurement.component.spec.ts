import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMeasurementComponent } from './form-measurement.component';

describe('FormMeasurementComponent', () => {
  let component: FormMeasurementComponent;
  let fixture: ComponentFixture<FormMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
