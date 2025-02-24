import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../service/user.service';
import { WalletService } from '../../../service/wallet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first-view',
  imports: [
    CommonModule
  ],
  templateUrl: './first-view.component.html',
  styleUrl: './first-view.component.css'
})
export class FirstViewComponent {


  userId:number |null = null;
  user: any={};
  walletDto = {
    balance: '',
    walletId: ''
  };
  constructor(private router:Router,
     private activatedRoute: ActivatedRoute, 
     private userService:UserService,
    private walletSerive:WalletService){}


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId) {
        this.getUserProfile(this.userId);
      } else {
        console.error('User ID is null');
      }
  });
  this.walletSerive.getWalletByUserId(this.userId).subscribe(
        (response) => {
          this.walletDto = response;
          console.log(this.walletDto.walletId); 
          console.log(this.walletDto.balance); 
        },
        (error) => {
          console.error('Error fetching wallet:', error); 
          Swal.fire({
            title: 'Error!',
            text: 'Failed to fetch wallet details.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }
 getUserProfile(userId:number){
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
  navigateToBooking() {
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Vehicle page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/booking'], { queryParams: { userId: this.userId } });
    });
  }
  navigateToBusBooking() {
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Bus page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/customer'], { queryParams: { userId: this.userId } });
    });
  }
  navigateToTravelHistory(){
    Swal.fire({
      title: 'Success!',
      text: 'You are being redirected to the Bus page.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/travellingHistory'], { queryParams: { userId: this.userId } });
    });
  }
}
