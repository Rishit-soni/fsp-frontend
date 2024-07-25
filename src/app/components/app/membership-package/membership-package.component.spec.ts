import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPackageComponent } from './membership-package.component';

describe('MembershipPackageComponent', () => {
  let component: MembershipPackageComponent;
  let fixture: ComponentFixture<MembershipPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
