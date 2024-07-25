import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkoutComponent } from './form-workout.component';

describe('FormWorkoutComponent', () => {
  let component: FormWorkoutComponent;
  let fixture: ComponentFixture<FormWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
