import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusStopsService } from '../../../service/bus-stops.service';
import { FareService } from '../../../service/fare.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusesService } from '../../../service/buses.service';
@Component({
  selector: 'app-customer',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  busStops: any[] = [];
  searchForBusDto = {
    sourceStopId: '',
    destinationStopId: ''
  };
  buses: any[] = [];
  userId: number | null = null;

  constructor(
    private rout: ActivatedRoute,
    private stopService: BusStopsService,
    private fareService: FareService,
    private route: Router,
    private busService:BusesService
  ) {}

  ngOnInit() {
    this.getBusStops();
    this.rout.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    // this.getAllBuses();
  }

  // getAllBuses(){
  //   this.busService.fetchAllBus().subscribe(
  //     response => {
  //       this.buses = response;
  //       console.log(this.buses);
  //     },
  //     error => {
  //       console.error('Error fetching bus stops:', error);
  //     }
  //   );
  // }

  getBusStops() {
    this.stopService.getBusStops().subscribe(
      response => {
        this.busStops = response;
      },
      error => {
        console.error('Error fetching bus stops:', error);
      }
    );
  }

  search() {
    if (!this.searchForBusDto.sourceStopId || !this.searchForBusDto.destinationStopId) {
      alert('Please select both Source and Destination.');
      return;
    }
    this.fareService.getAllBusesBySourceAndDestination({
      sourceStopId: this.searchForBusDto.sourceStopId,
      destinationStopId: this.searchForBusDto.destinationStopId
    }).subscribe(
      response => {
        this.buses = response; 
        console.log('Fetched buses:', this.buses);
      },
      error => {
        console.error('Error fetching buses:', error);
      }
    );
  }

  bookBus(bus: any) {
    this.route.navigate(['/bus_booking'], {
      queryParams: {
        busId: bus.busId,
        busName: bus.busName,
        busNumber: bus.busNumber,
        fare: bus.fare,
        fareId:bus.fareId,
        userId: this.userId,
        status: bus.status
      }
    });
  }
}

