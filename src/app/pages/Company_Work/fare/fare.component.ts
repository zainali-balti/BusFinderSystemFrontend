import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FareService } from '../../../service/fare.service';
import { BusesService } from '../../../service/buses.service';
import { RouteService } from '../../../service/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fare',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './fare.component.html',
  styleUrl: './fare.component.css'
})
export class FareComponent {
  busRoutes: any[] = [];
  buses: any[] = [];
  fareData = {
    busRouteId: '',
    busId: '',
    fare: null,
  };
  busId: string | null = null;
  busRouteId: string | null = null;

  constructor(
    private fareService: FareService,
    private busService: BusesService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.busId = params['busId'];
      this.busRouteId = params['busRouteId'];

      console.log('Params:', { busId: this.busId,
         busRouteId: this.busRouteId });

      if (this.busId) this.loadBuses(this.busId);
      if (this.busRouteId) this.loadRoutes(this.busRouteId);
    });
  }
  loadRoutes(busRouteId: string) {
    this.routeService.getRoute(busRouteId).subscribe((response: any) => {
      console.log('Routes Response:', response);
      this.busRoutes = Array.isArray(response) ? response : [response];
    });
  }

  loadBuses(busId: string) {
    this.busService.getBus(busId).subscribe((response: any) => {
      console.log('Buses Response:', response);
      this.buses = Array.isArray(response) ? response : [response];
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Fare Data before submitting:', this.fareData); 
      this.fareService.addFares(this.fareData).subscribe(
        (response: any) => {
          const busId = response?.busId ?? response?.data?.busId;
          console.log('🔄 Redirecting to:', `/fare-details/${busId}`);
          Swal.fire({
                                title: 'Success!',
                                text: 'Bus created successfully.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                              }).then(() => {
                                this.router.navigate(['/fare-details', response.busId]);
                              });
  },
        (error) => {
          console.error('Error adding fare:', error);
          alert('Failed to add fare. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  
}

