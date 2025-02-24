import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';// ✅ Correct module


declare const google: any;
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    RouterLink
   
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: SocialUser | null = null;
  ;
constructor(private loginService:LoginService,private route:Router,private authService: SocialAuthService){}

  loginData = {
    username : '',
    password : ''
  }

  // ngAfterViewInit(): void {
  //   google.accounts.id.initialize({
  //     client_id: '7119974607-6pte2athd92312hobp17q42klp28g3jo.apps.googleusercontent.com',
  //     callback: (response: any) => this.handleCredentialResponse(response)
  //   });
  //   const buttonDiv = document.getElementById("google-signin-btn");
  //   console.log(window.location.origin);
  //   if (buttonDiv) {
  //     google.accounts.id.renderButton(buttonDiv, { theme: "outline", size: "large" });
  //   } else {
  //     console.error("Element with ID 'google-signin-btn' not found");
  //   }
  // }

  // handleCredentialResponse(response: any): void {
  //   console.log("Google login success:", response);
  

  // }
  onLogin() {
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
                  Swal.fire({
                                title: 'Success!',
                                text: 'Authentication successfully For Company.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                              }).then(() => {
                              this.route.navigate(['companyFirstView'],{ queryParams: { userId: data.userId } }); 
                              });
                  
                } else if (role == "CUSTOMER") {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Authentication successfully For Customer.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                  this.route.navigate(['firstView'],{ queryParams: { userId: data.userId } });
                  });
                  
                  console.log(data.userId)
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
        Swal.fire({
          title: 'Error!',
          text: 'UserName or Password is Invalid.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  // googleSignIn(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
  //     (user) => this.onGoogleSignInSuccess(user),
  //     (error) => this.onGoogleSignInError(error)
  //   );
  // }

  // onGoogleSignInSuccess(user: any) {
  //   console.log("Google Sign-In Success:", user);
  //   this.user = user;
  //   if (user && user.idToken) {
  //     this.loginService.googleLogin(user.idToken).subscribe({
  //       next: (data: any) => {
  //         console.log("Backend Response:", data);
  //         if (data.token) {
  //           this.loginService.logIn(data.token);
  //           console.log("Token stored:", data.token);

  //           this.loginService.getCurrentUser().subscribe({
  //             next: (userData: any) => {
  //               console.log("Current user retrieved:", userData);
  //               if (userData) {
  //                 this.loginService.setUsers(userData);
  //                 console.log("User info stored:", userData);

  //                 const role = this.loginService.getUserRole();
  //                 console.log("User role:", role);

  //                 if (role === "CUSTOMER") {
  //                   Swal.fire({
  //                     title: "Success!",
  //                     text: "Authentication successful for Customer.",
  //                     icon: "success",
  //                     confirmButtonText: "OK",
  //                   }).then(() => {
  //                     this.route.navigate(["firstView"], {
  //                       queryParams: { userId: data.userId },
  //                     });
  //                   });
  //                 } else {
  //                   this.loginService.loggedOut();
  //                   console.error("Unauthorized user role:", role);
  //                 }
  //               } else {
  //                 console.error("Failed to retrieve user information.");
  //               }
  //             },
  //             error: (userError) => {
  //               console.error("Error retrieving current user:", userError);
  //             },
  //           });
  //         } else {
  //           console.error("Token not found in the response.");
  //         }
  //       },
  //       error: (error) => {
  //         console.error("Google login failed:", error);
  //         Swal.fire({
  //           title: "Error!",
  //           text: "Google authentication failed.",
  //           icon: "error",
  //           confirmButtonText: "OK",
  //         });
  //       },
  //     });
  //   } else {
  //     console.error("Google token not received.");
  //   }
  // }

  // onGoogleSignInError(error: any) {
  //   console.error("Google Sign-In Error:", error);
  // }



  
  reset(){
    this.loginData = {
      username : '',
      password : ''
    }
  }

}

  // ngOnInit(): void {
  //   google.accounts.id.initialize({
  //     client_id: "7119974607-o3pgr39tp1ranev7t74cej0qc6imkvij.apps.googleusercontent.com",
  //     callback: (response: any) => this.onGoogleSignInSuccess(response),
  //   });
  
  //   google.accounts.id.renderButton(
  //     document.getElementById("googleButton"),
  //     { theme: "outline", size: "large" }
  //   );
  // }