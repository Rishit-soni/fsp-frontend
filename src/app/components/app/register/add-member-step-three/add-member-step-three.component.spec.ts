import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberStepThreeComponent } from './add-member-step-three.component';

describe('AddMemberStepThreeComponent', () => {
  let component: AddMemberStepThreeComponent;
  let fixture: ComponentFixture<AddMemberStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberStepThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
