import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../service/vehicle.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-your-vehicle-booking',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './your-vehicle-booking.component.html',
  styleUrl: './your-vehicle-booking.component.css'
})
export class YourVehicleBookingComponent {
  userId:number |null = null;
  bookings: any[] = [];

  constructor(private route:ActivatedRoute, private vehicleService:VehicleService,private router:Router){}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? Number(params['userId']) : null;
    });

    if (this.userId) {
      this.fetchVehicleByUserID(this.userId);
    }
  }
  fetchVehicleByUserID(userId:number){
  this.vehicleService.getVehicleByUserId(userId).subscribe(
           (response) => {
             this.bookings = response;
             console.log(this.bookings);
           },
           (error) => {
             console.error('Error fetching your vehicle booking:', error);
             Swal.fire({
               title: 'Error!',
               text: 'Failed to fetch booking history.',
               icon: 'error',
               confirmButtonText: 'OK',
             });
           }
         );
  }
  cancelBooking(bookingId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deleteBooking(bookingId).subscribe(
          response => {
            Swal.fire(
              'Canceled!',
              'Your booking has been canceled.',
              'success'
            );
            this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
          },
          error => {
            console.error('Error canceling booking:', error);
            Swal.fire(
              'Failed!',
              'Failed to cancel booking. Please try again.',
              'error'
            );
          }
        );
      }
    });
  }
  back(){
    this.router.navigate(['/booking'], { queryParams: { userId: this.userId} });
  }
  }



