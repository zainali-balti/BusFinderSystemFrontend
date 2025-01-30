import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../../service/route.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
  stopId: string | null = null;
  route = {
    routeId:'',
    stopSequence:''
  };
  constructor(private rout: ActivatedRoute,private routeService:RouteService, private router: Router) {
      this.rout.params.subscribe(params => {
        this.busId = params['busId'];
        this.stopId = params['stopId'];
      });
    }

    ngOnInit() {
      console.log('Bus ID:', this.busId);
      console.log('Stop ID:', this.stopId);
    }


    onSubmit(form: NgForm) {
      if (form.valid && this.busId && this.stopId) {
        this.routeService.addRoute(this.route, this.busId, this.stopId).subscribe(
          (response: any) => {
            console.log('Response:', response);  // Log the entire response
            if (response && response.routeId) {
              console.log('Route ID:', response.routeId);
              this.router.navigate(['/schedule', this.busId, this.stopId, response.routeId]);
            } else {
              console.error('Route ID not found in response');
              alert('Failed to add route. Route ID is missing.');
            }
          },
          error => {
            console.error('Error adding route:', error);
            alert('Failed to add route. Please try again.');
          }
        );
      } else {
        alert('Please fill out the form correctly.');
      }
    }
}
