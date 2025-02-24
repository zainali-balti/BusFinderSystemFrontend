import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-individual-bus',
  imports: [],
  templateUrl: './individual-bus.component.html',
  styleUrl: './individual-bus.component.css'
})
export class IndividualBusComponent {
  onButtonClick() {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'Booking feature coming soon!',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }
  
}
