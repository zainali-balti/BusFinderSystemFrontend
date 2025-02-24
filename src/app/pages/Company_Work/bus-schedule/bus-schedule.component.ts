import { Component } from '@angular/core';
import { BusScheduleService } from '../../../service/bus-schedule.service';
import { BusesService } from '../../../service/buses.service';
import { RouteService } from '../../../service/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


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
  scheduleData = {
    busId: '',
    busRouteId: '',
    arrivalTime: '',
    departureTime: '',
    routeId:'',
    sourceStopId:'',
    destinationStopId:''

  };
  buses: any[] = [];
  busRoute: any[]= [];
  busId: string | null = null;
  userId: string | null = null;
  busRouteId: string | null = null;

  constructor(
    private busScheduleService: BusScheduleService,
    private busService: BusesService,
    private routeService: RouteService,
    private rout: ActivatedRoute,
    private router: Router
  ) {
    this.rout.params.subscribe(params => {
      this.busId = params['busId'];
      this.userId = params['userId'];
      this.busRouteId = params['busRouteId'];
      console.log(this.busId);
      console.log(this.busRouteId);
      console.log(this.userId);
      if (this.busId) {
        this.loadBuses(this.busId);
      }
      if (this.busRouteId) {
        this.loadRoutes(this.busRouteId);
      }
    });
  }

 loadBuses(busId: string) {
  this.busService.getBus(busId).subscribe((bus:any) => {
    this.buses = [bus];  
    this.scheduleData.busId = bus.busId;
  });
}

loadRoutes(busRouteId: string) {
  this.routeService.getRoute(busRouteId).subscribe((route:any) => {
    this.busRoute = [route]; 
    this.scheduleData.busRouteId = route.busRouteId;
     this.scheduleData.routeId = route.routeId; 
     this.scheduleData.sourceStopId = route.sourceStopId;
     this.scheduleData.destinationStopId = route.destinationStopId;
  });
}



onSubmit(form: NgForm) {
  if (form.valid) {
    if (this.scheduleData.busId && this.scheduleData.busRouteId) {
      this.busScheduleService.addBusSchedule(this.scheduleData).subscribe(
        (response: any) => {
          console.log('Full API Response:', response);
          const routeId = response?.data?.routeId;
          if (routeId) {
            console.log('Route ID:', routeId);
            this.scheduleData.routeId = routeId;

            Swal.fire({
              title: 'Success!',
              text: 'Bus schedule created successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              if (this.scheduleData.busId && this.scheduleData.busRouteId && this.scheduleData.routeId) {
                this.router.navigate(['/fare', this.scheduleData.busId, this.scheduleData.busRouteId,this.userId]);
              } else {
                console.error('Navigation error: One or more required values are missing.');
                 Swal.fire({
                            title: 'Error!',
                            text: 'Some Fields are missing.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                          });
              }
            });
          } else {
            console.error('Error: Route ID is missing in API response.');
            Swal.fire({
                       title: 'Route Id!',
                       text: 'Route ID Not Found.',
                       icon: 'error',
                       confirmButtonText: 'OK'
                     });
          }
        },
        (error) => {
          console.error('Error adding bus schedule:', error);
          Swal.fire({
                     title: 'Error!',
                     text: 'Failed to add Bus Schedule.',
                     icon: 'error',
                     confirmButtonText: 'OK'
                   });
        }
      );
    } else {
      Swal.fire({
                 title: 'Bus And Route Id!',
                 text: 'Failed to add Bus Schedule.',
                 icon: 'error',
                 confirmButtonText: 'OK'
               });
    }
  }
}


}
