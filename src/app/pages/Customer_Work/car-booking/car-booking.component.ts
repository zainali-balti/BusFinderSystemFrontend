import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../service/vehicle.service';
import { UserService } from '../../../service/user.service';
import { BookingService } from '../../../service/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-booking',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './car-booking.component.html',
  styleUrl: './car-booking.component.css'
})
export class CarBookingComponent {
  userId: number | null = null;
  vehicleId: number | null = null;
  vehicle: any = null;
  userData: any = null;

  bookingData = {
    bookingDate: '',
    endDate: '',
    distance: 0,
    totalPrice: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private userService: UserService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? Number(params['userId']) : null;
      this.vehicleId = params['vehicleId'] ? Number(params['vehicleId']) : null;
    });

    if (this.vehicleId) {
      this.fetchVehicleByID(this.vehicleId);
    }
    if (this.userId) {
      this.fetchUserByID(this.userId);
    }
  }

  fetchVehicleByID(vehicleId: number) {
    this.vehicleService.getVehicleById(vehicleId).subscribe(
      (response: any) => {
        this.vehicle = response;
        console.log('Fetched Vehicle:', this.vehicle);
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
        alert('Failed to fetch vehicle details. Please try again.');
      }
    );
  }

  fetchUserByID(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (response: any) => {
        this.userData = response;
        console.log('Fetched user:', this.userData);
      },
      (error) => {
        console.error('Error fetching user:', error);
        alert('Failed to fetch user details. Please try again.');
      }
    );
  }

  calculateTotalPrice() {
    if (this.vehicle && this.bookingData.distance > 0) {
      this.bookingData.totalPrice = this.bookingData.distance * this.vehicle.price;
    }
  }

  submitBooking() {
    if (!this.userId || !this.vehicleId) {
      alert('User or Vehicle information is missing.');
      return;
    }
  
    const bookingDateTime = this.convertToLocalDateTime(this.bookingData.bookingDate);
    const endDateTime = this.convertToLocalDateTime(this.bookingData.endDate);
  
    const bookingPayload = {
      userId: this.userId,
      vehicleId: this.vehicleId,
      bookingDate: bookingDateTime,
      endDate: endDateTime,
      distance: this.bookingData.distance,
      totalPrice: this.bookingData.totalPrice
    };
  
    this.bookingService.addVehicleBooking(bookingPayload).subscribe(
      (response: any) => {
        if (response && response.id) {
           Swal.fire({
                                   title: 'Success!',
                                   text: ' Car Booking successfull.',
                                   icon: 'success',
                                   confirmButtonText: 'OK'
                                 }).then(() => {
                                  this.router.navigate(['/booking-history']);
                                 });
        } else {
          alert('Unexpected response from server.');
        }
      },
      (error) => {
        console.error('Booking failed:', error);
        alert('Failed to create booking. Please try again.');
      }
    );
  }
  
  convertToLocalDateTime(dateString: string): string {
    return dateString + 'T00:00:00'; 
  }
  
}


