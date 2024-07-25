import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExerciseComponent } from './form-exercise.component';

describe('FormExerciseComponent', () => {
  let component: FormExerciseComponent;
  let fixture: ComponentFixture<FormExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
