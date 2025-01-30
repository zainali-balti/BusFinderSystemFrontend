import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService:LoginService,private route:Router){}

  loginData = {
    username : '',
    password : ''
  }

  submit() {
    this.loginService.generateTokens(this.loginData).subscribe({
      next: (data: any) => {
        console.log("Token is generated!", data);
        if (data.token) {
          this.loginService.logIn(data.token);
          console.log("Token stored:", data.token);
          this.loginService.getCurrentUser().subscribe({
            next: (user: any) => {
              console.log('Current user retrieved:', user); 
              if (user) {
                this.loginService.setUsers(user);
                console.log('User info stored:', user);
                const role = this.loginService.getUserRole();
                console.log('User role:', role);
                if (role == "COMPANY") {
                  this.route.navigate(['bus']); 
                } else if (role == "CUSTOMER") {
                  this.route.navigate(['bus']);
                } else {
                  this.loginService.loggedOut();
                  console.error('Unknown user role:', role);
                }
              } else {
                console.error('Failed to retrieve user information.');
              }
            },
            error: (userError) => {
              console.error('Error retrieving current user:', userError);
            }
          });
        } else {
          console.error('Token not found in the response.');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  reset(){
    this.loginData = {
      username : '',
      password : ''
    }
  }

}
