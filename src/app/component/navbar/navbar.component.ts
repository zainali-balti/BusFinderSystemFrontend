import { Component, HostListener } from '@angular/core';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

interface DropdownState {
  Plan: boolean;
  Book: boolean;
  Card: boolean;
  Fleet: boolean;
  vehicle:boolean;
  renter:boolean;
  logout: boolean;
}
@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  dropdowns: DropdownState = {
    Plan: false,
    Book: false,
    Card: false,
    Fleet:false,
    vehicle:false,
    renter:false,
    logout:false
  };
  constructor(private loginService:LoginService,private router:Router){}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.nav-item')) {
      this.closeAllDropdowns();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleDropdown(menu: keyof DropdownState | 'logout', event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeAllDropdowns();
    this.dropdowns[menu] = !this.dropdowns[menu];
  }
  

  closeAllDropdowns() {
    Object.keys(this.dropdowns).forEach(key => {
      this.dropdowns[key as keyof DropdownState] = false;
    });
  }
  logout() {
    if (!this.loginService.isLoggedIn()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please Login First',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Log out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.loggedOut();
        Swal.fire('Logged out!', 'You have been logged out.', 'success');
        this.router.navigate(['/home']);
      }
    });
  }
  
  

}
