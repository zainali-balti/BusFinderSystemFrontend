import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  userId: String | null = null;
  userData: any[] = [];

  constructor(private userService:UserService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'] || null;
    });
    console.log("UserId: ",this.userId);
    this.getAllUsers();
  }
  getAllUsers(){
       this.userService.getAllUsersDetails().subscribe(
         (response) => {
           this.userData = response;
           console.log(this.userData);
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
  back(){
        Swal.fire({
          title: 'Success!',
          text: 'You are being redirected to the DashBoard page.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/companyFirstView'], { queryParams: { userId: this.userId } });
        });
      }
  }
