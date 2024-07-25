import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberStepFiveComponent } from './add-member-step-five.component';

describe('AddMemberStepFiveComponent', () => {
  let component: AddMemberStepFiveComponent;
  let fixture: ComponentFixture<AddMemberStepFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberStepFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberStepFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
