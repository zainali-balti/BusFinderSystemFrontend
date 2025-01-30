import { Component } from '@angular/core';
import { BusScheduleService } from '../../../service/bus-schedule.service';
import { BusesService } from '../../../service/buses.service';
import { BusStopsService } from '../../../service/bus-stops.service';
import { RouteService } from '../../../service/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-schedule',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './bus-schedule.component.html',
  styleUrl: './bus-schedule.component.css'
})
export class BusScheduleComponent {
  buses: any[] = [];
  busStops: any[] = [];
  routes: any[] = [];
  scheduleData = {
    busId: '',
    stopId: '',
    routeId: '',
    arrivalTime: '',
    departureTime: '',
    sequence: 1
  };
  busId: string | null = null;
  stopId: string | null = null;
  routeId: string | null = null;

  constructor(
    private busScheduleService: BusScheduleService,
    private busService: BusesService,
    private busStopService: BusStopsService,
    private routeService: RouteService,
    private rout: ActivatedRoute,
    private router: Router
  ) {
    this.rout.params.subscribe(params => {
      this.busId = params['busId'];
      this.stopId = params['stopId'];
      this.routeId = params['routeId'];
      if (this.busId) {
        this.loadBuses(this.busId);
      }
      if (this.stopId) {
        this.loadBusStops(this.stopId);
      }
      if (this.routeId) {
        this.loadRoutes(this.routeId);
      }
    });
  }

 loadBuses(busId: string) {
  this.busService.getBus(busId).subscribe(bus => {
    this.buses = [bus];  
  });
}

loadBusStops(stopId: string) {
  this.busStopService.getBusStopsById(stopId).subscribe(busStop => {
    this.busStops = [busStop]; 
  });
}

loadRoutes(routeId: string) {
  this.routeService.getRoute(routeId).subscribe(route => {
    this.routes = [route]; 
  });
}

onSubmit(form: NgForm) {
  if (form.valid) {
    if (this.busId && this.stopId && this.routeId) {
      this.busScheduleService.addBusSchedule(this.scheduleData, this.busId, this.stopId, this.routeId).subscribe(
        (response: any) => {
          console.log('Full API Response:', response);
          
          // ✅ Correctly extract routeId from response.data
          const routeId = response?.data?.routeId;

          if (routeId) {
            console.log('Route ID:', routeId);
            this.router.navigate(['/fare', this.busId,this.stopId,routeId]);
          } else {
            console.error('Error: Route ID is missing in API response.');
            alert('Failed to retrieve Route ID. Please check backend response.');
          }
        },
        (error) => {
          console.error('Error adding bus schedule:', error);
          alert('Failed to add bus schedule. Please try again.');
        }
      );
    } else {
      alert('Bus ID, Stop ID, or Route ID is missing.');
    }
  }
}

}
