import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusStopsService } from '../../../service/bus-stops.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-stop',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './bus-stop.component.html',
  styleUrl: './bus-stop.component.css'
})
export class BusStopComponent {
  busId: string | null = null;
  busStop = {
    stopId:'',
    name: ''
  };

  constructor(private route: ActivatedRoute,private busStopService:BusStopsService, private router: Router) {
    this.route.params.subscribe(params => {
      this.busId = params['busId'];
    });
  }

  ngOnInit() {
    console.log('Bus ID:', this.busId);
  }
  onSubmit(form: NgForm) {
    if (form.valid && this.busId) {
      this.busStopService.addBusStops(this.busStop, this.busId).subscribe(
        (response:any) => { 
          alert('Bus stop added successfully!');
          this.router.navigate(['/route', this.busId,response.data.stopId]); 
        },
        error => {
          console.error('Error adding bus stop:', error);
          alert('Failed to add bus stop. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
