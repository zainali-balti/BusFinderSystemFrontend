import { Component } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  vehicles: any[] = []; 
  userId: String | null = null;

  constructor(private vehicleService: VehicleService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchVehicles();  
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || '';
    });
  }

  fetchVehicles() {
    this.vehicleService.getAllVehicles().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {  
          this.vehicles = response;
          console.log('Vehicles:', this.vehicles); 
        } else {
          console.error('No data found in response.');
        }
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to Booked Bus.',
            icon: 'error',
            confirmButtonText: 'OK'
          });      }
    );
}

  getShortDescription(description: string): string {
    const words = description.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') : description;
  }
  toggleDescription(vehicle: any, event: Event): void {
    event.preventDefault(); 
    vehicle.showFullDescription = !vehicle.showFullDescription;
  }

  bookVehicle(vehicleId:number) {
    this.router.navigate(['/carBooking'], { queryParams: { userId: this.userId, vehicleId:vehicleId} });
  }
}

