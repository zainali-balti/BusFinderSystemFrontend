import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusStopsService } from '../../../service/bus-stops.service';
import { FareService } from '../../../service/fare.service';
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
     source: '', 
     destination: '' 
    }; 
  buses: any[] = []; 

  constructor(private stopService: BusStopsService,private fareService:FareService) {}

  ngOnInit() {
    this.getBusStops(); 
  }
  getBusStops() {
    this.stopService.getBusStops().subscribe(
      (response) => {
        this.busStops = response;  
      },
      (error) => {
        console.error('Error fetching bus stops:', error); 
      }
    );
  }
  search() {
    if (!this.searchForBusDto.source || !this.searchForBusDto.destination) {
      alert('Please select both Source and Destination.');
      return;
    }

    console.log("Searching for route from:", this.searchForBusDto.source, "to", this.searchForBusDto.destination);
    this.fareService.getAllBusesBySourceAndDestination(this.searchForBusDto).subscribe(
      (response) => {
        this.buses = response;
        console.log('Fetched buses:', this.buses);
      },
      (error) => {
        console.error('Error fetching buses:', error); 
      }
    );
  }
}
