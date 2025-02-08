import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-first-view',
  imports: [],
  templateUrl: './company-first-view.component.html',
  styleUrl: './company-first-view.component.css'
})
export class CompanyFirstViewComponent {
  userId:string |null = null;


  constructor(private router:Router, private activatedRoute: ActivatedRoute){}


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
  });
  }

  navigateToVehicle() {
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Vehicle page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/vehicle'], { queryParams: { userId: this.userId } });
    });
  }
  navigateToBus(){
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Bus page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/bus'], { queryParams: { userId: this.userId } });
    });
  }
}
