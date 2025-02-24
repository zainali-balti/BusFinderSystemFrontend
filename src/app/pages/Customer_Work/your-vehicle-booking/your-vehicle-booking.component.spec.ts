import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVehicleBookingComponent } from './your-vehicle-booking.component';

describe('YourVehicleBookingComponent', () => {
  let component: YourVehicleBookingComponent;
  let fixture: ComponentFixture<YourVehicleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourVehicleBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourVehicleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
