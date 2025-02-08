import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-first-view',
  imports: [],
  templateUrl: './first-view.component.html',
  styleUrl: './first-view.component.css'
})
export class FirstViewComponent {


  userId:string |null = null;


  constructor(private router:Router, private activatedRoute: ActivatedRoute){}


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
  });
  }

  navigateToBooking() {
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Booking page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/booking'], { queryParams: { userId: this.userId } });
    });
  }
  navigateToBusBooking() {
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Booking page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/customer'], { queryParams: { userId: this.userId } });
    });
  }
}
