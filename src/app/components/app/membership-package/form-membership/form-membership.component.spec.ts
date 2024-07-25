import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMembershipComponent } from './form-membership.component';

describe('FormMembershipComponent', () => {
  let component: FormMembershipComponent;
  let fixture: ComponentFixture<FormMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
