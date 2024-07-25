import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietExpirationComponent } from './diet-expiration.component';

describe('DietExpirationComponent', () => {
  let component: DietExpirationComponent;
  let fixture: ComponentFixture<DietExpirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietExpirationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
