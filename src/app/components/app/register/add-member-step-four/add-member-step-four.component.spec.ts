import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberStepFourComponent } from './add-member-step-four.component';

describe('AddMemberStepFourComponent', () => {
  let component: AddMemberStepFourComponent;
  let fixture: ComponentFixture<AddMemberStepFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberStepFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
