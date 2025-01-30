import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FareService } from '../../../service/fare.service';
import { BusesService } from '../../../service/buses.service';
import { BusStopsService } from '../../../service/bus-stops.service';
import { RouteService } from '../../../service/route.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  routes: any[] = [];
  busStops: any[] = [];
  buses: any[] = [];
  fareData = {
    routeId: '',
    sourceStopId: '',
    destinationStopId: '',
    busId: '',
    fare: null,
  };
  busId: string | null = null;
  stopId: string | null = null;
  routeId: string | null = null;

  constructor(
    private fareService: FareService,
    private busService: BusesService,
    private busStopService: BusStopsService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.busId = params['busId'];
      this.stopId = params['stopId'];
      this.routeId = params['routeId'];

      console.log('Params:', { busId: this.busId, stopId: this.stopId, routeId: this.routeId });

      if (this.busId) this.loadBuses(this.busId);
      if (this.stopId) this.loadBusStops();
      if (this.routeId) this.loadRoutes(this.routeId);
    });
  }

  // ✅ Ensure API response is an array
  loadRoutes(routeId: string) {
    this.routeService.getRoute(routeId).subscribe((response: any) => {
      console.log('Routes Response:', response);
      this.routes = Array.isArray(response) ? response : [response];
    });
  }

  loadBusStops() {
    this.busStopService.getBusStops().subscribe((response: any) => {
      console.log('Bus Stops Response:', response);
      this.busStops = Array.isArray(response) ? response : [response];
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
      console.log('Form Data:', this.fareData);
      this.fareService.addFares(this.fareData).subscribe(
        (response: any) => {
          alert('Fare added successfully!');
          this.router.navigate(['/fares']);
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

