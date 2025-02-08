import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../../service/route.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BusStopsService } from '../../../service/bus-stops.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-route',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent {
  busId: string | null = null;
  busStops: any[] = [];
  routes: any[] = [];
  busRoute = {
    busRouteId:'',
    routeId: '',
    sourceStopId: '',
    destinationStopId: '',
    sequence: ''
  };

  constructor(
    private rout: ActivatedRoute,
    private routeService: RouteService,
    private router: Router,
    private stopService: BusStopsService
  ) {
    this.rout.params.subscribe(params => {
      this.busId = params['busId'];
    });
  }

  ngOnInit() {
    console.log('Bus ID:', this.busId);
    this.getBusStops();
    this.getAllRoutesForBus();
  }

  getBusStops() {
    this.stopService.getBusStops().subscribe(
      (response) => {
        console.log('Bus Stops Response:', response); 
        this.busStops = response;
      },
      (error) => {
        console.error('Error fetching bus stops:', error);
      }
    );
  }
  

  getAllRoutesForBus() {
    this.routeService.getAllRoute().subscribe(
      (response) => {
        this.routes = response;
      },
      (error) => {
        console.error('Error fetching routes:', error);
      }
    );
  }

  onSubmit() {
    if (
      !this.busRoute.routeId ||
      !this.busRoute.sourceStopId ||
      !this.busRoute.destinationStopId ||
      !this.busRoute.sequence
    ) {
      alert('Please fill all fields!');
      return;
    }
  
    const formData = {
      busId: this.busId,
      routeId: this.busRoute.routeId,
      sourceStopId: this.busRoute.sourceStopId,
      destinationStopId: this.busRoute.destinationStopId,
      sequence: this.busRoute.sequence
    };
  
    this.routeService.addBusRoute(formData).subscribe(
      (response: any) => {
        console.log('Full API Response:', response);
        if (!response || !response.routeId) {
          console.error('Invalid API response:', response);
          alert('Failed to retrieve route data. Please check the backend.');
          return;
        }
        this.busRoute.busRouteId = response.routeId;
        if (this.busRoute.busRouteId) {
          console.log(this.busRoute.busRouteId);
          Swal.fire({
                        title: 'Success!',
                        text: 'Bus Route created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(() => {
                        this.router.navigate(['/schedule', this.busId, this.busRoute.busRouteId]);
                      });
        } else {
          alert('Route ID is missing. Please check API response.');
        }
      },
      (error) => {
        console.error('Error adding bus route:', error);
        alert('Failed to add bus route. Please try again.');
      }
    );
  }

}

