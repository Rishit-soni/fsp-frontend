import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationPackageComponent } from './expiration-package.component';

describe('ExpirationPackageComponent', () => {
  let component: ExpirationPackageComponent;
  let fixture: ComponentFixture<ExpirationPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirationPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
