import { Component } from '@angular/core';
import { FareService } from '../../../service/fare.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fare-details',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './fare-details.component.html',
  styleUrl: './fare-details.component.css'
})
export class FareDetailsComponent {
  fares: any[] = [];  
  busId: number | null = null;

  constructor(private fareService: FareService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.busId = params['busId'];
      console.log('Bus ID: ', this.busId);
      if (this.busId) {
        this.getFaresByBusId(this.busId);
      } else {
        console.error('Bus ID is missing or invalid');
      }
    });
  }

  getFaresByBusId(busId: number): void {
    this.fareService.getAllfaresByBusId(busId).subscribe(
      (data) => {
        console.log('API Response:', data);  
        this.fares = data; 
        console.log('Fares:', this.fares);  
      },
      (error) => {
        console.error('Error fetching fares', error);
        this.fares = []; 
      }
    );
  }
  
}

