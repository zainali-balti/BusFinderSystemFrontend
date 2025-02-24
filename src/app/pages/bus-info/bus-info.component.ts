import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bus-info',
  imports: [],
  templateUrl: './bus-info.component.html',
  styleUrl: './bus-info.component.css'
})
export class BusInfoComponent {
  onButtonClick() {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'Booking feature coming soon!',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }
}
