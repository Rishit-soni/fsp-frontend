import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInquiryComponent } from './form-inquiry.component';

describe('FormInquiryComponent', () => {
  let component: FormInquiryComponent;
  let fixture: ComponentFixture<FormInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
