import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-first-view',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './company-first-view.component.html',
  styleUrl: './company-first-view.component.css'
})
export class CompanyFirstViewComponent {
  userId: number | null = null;
  user: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'] || null;
      if (this.userId) {
        this.getAllUser(this.userId);
      } else {
        console.error('User ID is null');
      }
    });
  }

  getAllUser(userId: number | null) {
    if (!userId) {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid user ID.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.userService.getUserById(userId).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);
      },
      (error) => {
        console.error('Error fetching user:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch user history.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
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
  getAllUserDetails(){
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the User Details page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/allUser'], { queryParams: { userId: this.userId } });
    });
  }
  getAllBusesByUserId(){
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to Your Own Buses page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/userBus'], { queryParams: { userId: this.userId } });
    });
  }
  getAllVehicles(){
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to Your Own Buses page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/userVehicles'], { queryParams: { userId: this.userId } });
    });
  }
}
