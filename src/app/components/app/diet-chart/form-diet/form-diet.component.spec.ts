import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDietComponent } from './form-diet.component';

describe('FormDietComponent', () => {
  let component: FormDietComponent;
  let fixture: ComponentFixture<FormDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
