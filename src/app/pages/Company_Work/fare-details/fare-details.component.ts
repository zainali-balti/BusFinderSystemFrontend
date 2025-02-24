import { Component } from '@angular/core';
import { FareService } from '../../../service/fare.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  userId: number | null = null;

  constructor(private fareService: FareService,
     private activatedRoute: ActivatedRoute,
    private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.busId = params['busId'];
      this.userId = params['userId'];
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
  addMoreRoutes(){
       Swal.fire({
          title: 'Success!',
          text: 'You are being redirected to the Bus Route page.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/route',this.busId,this.userId]);
        });
  }
  goBackToHome(){
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Company dashboard.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/companyFirstView'],{ queryParams: { userId: this.userId } });
    });
  }
  
}

