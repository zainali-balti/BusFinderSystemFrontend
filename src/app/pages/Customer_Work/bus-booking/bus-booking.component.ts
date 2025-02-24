import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusBookingService } from '../../../service/bus-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bus-booking',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './bus-booking.component.html',
  styleUrl: './bus-booking.component.css'
})
export class BusBookingComponent {
  bookingData = {
    bookingId:'',
    busId: '',
    fareId: '',
    totalFare: '',
    userId: '',
    status: '',
    busName:'',
    busNumber:'',
    scheduleId:''
  };

  constructor(private route: ActivatedRoute, private router: Router, private busBooking:BusBookingService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bookingData.busId = params['busId'] || '';
      this.bookingData.fareId = params['fareId'] || '';
      this.bookingData.totalFare = params['fare'] || '';
      this.bookingData.userId = params['userId'] || '';
      this.bookingData.status = params['status'] || '';
      this.bookingData.busName = params['busName'] || '';
      this.bookingData.busNumber = params['busNumber'] || '';
    });
  }

  bookNow() {
    const formData = {
      busId: this.bookingData.busId,
      fareId: this.bookingData.fareId,
      totalFare: this.bookingData.totalFare,
      userId: this.bookingData.userId,
      status: this.bookingData.status
    };

    this.busBooking.addBusBooking(formData).subscribe(
      (response:any) => {
        console.log('Booking successful', response);
        this.bookingData.bookingId = response.bookingId; 
        Swal.fire({
              title: 'Success!',
              text: 'Bus Booking successfully',
              icon: 'success',
              confirmButtonText: 'OK'
              }).then(() => { 
                this.router.navigate(['/transaction'], {
                queryParams: { 
                userId:this.bookingData.userId,
                bookingId:this.bookingData.bookingId
                }
            });
              });
       
      },
      error => {
        console.error('Error booking bus', error);
        Swal.fire({
                   title: 'Error!',
                   text: 'Failed to add Booked Bus.',
                   icon: 'error',
                   confirmButtonText: 'OK'
                 });
      }
    );
  }
  
}
