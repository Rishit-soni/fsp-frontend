import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberStepOneComponent } from './add-member-step-one.component';

describe('AddMemberStepOneComponent', () => {
  let component: AddMemberStepOneComponent;
  let fixture: ComponentFixture<AddMemberStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberStepOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
