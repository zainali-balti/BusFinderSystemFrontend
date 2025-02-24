import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusBookingService } from '../../service/bus-booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travelling-history',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './travelling-history.component.html',
  styleUrl: './travelling-history.component.css'
})
export class TravellingHistoryComponent {
  travelHistory: any[] = [];
  userId:number | null = null;

  constructor(private busBookingService:BusBookingService,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'] || null;
    });
    console.log("UserId: ",this.userId);
    if (this.userId) {
      this.getAllTravellingHistory(this.userId);
    }
  }
  getAllTravellingHistory(userId:number){
        this.busBookingService.getBusBookingByUserId(userId).subscribe(
                 (response) => {
                   this.travelHistory = response;
                   console.log(this.travelHistory);
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
}
