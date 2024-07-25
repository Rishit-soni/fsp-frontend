import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutExpirationComponent } from './workout-expiration.component';

describe('WorkoutExpirationComponent', () => {
  let component: WorkoutExpirationComponent;
  let fixture: ComponentFixture<WorkoutExpirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutExpirationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
