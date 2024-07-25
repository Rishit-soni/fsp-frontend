import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberStepTwoComponent } from './add-member-step-two.component';

describe('AddMemberStepTwoComponent', () => {
  let component: AddMemberStepTwoComponent;
  let fixture: ComponentFixture<AddMemberStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberStepTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
