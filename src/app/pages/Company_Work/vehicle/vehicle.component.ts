import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { VehicleService } from '../../../service/vehicle.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  vehicle = {
    vehicleName: '',
    color: '',
    engineNo: '',
    modelNo: '',
    totalSeats: 0,
    description: '',
    price: 0,
    distance: 0,
    img: null
  };

  constructor(private vehicleService: VehicleService, private route:Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vehicle.img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  dataURLtoBlob(dataURL: string) {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: 'image/jpeg' });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const currentUserId = this.getUserId();
      if (!currentUserId) {
        alert('User is not authenticated!');
        return;
      }


      const formData = new FormData();
      formData.append('vehicleName', this.vehicle.vehicleName);
      formData.append('color', this.vehicle.color);
      formData.append('engineNo', this.vehicle.engineNo);
      formData.append('modelNo', this.vehicle.modelNo);
      formData.append('totalSeats', this.vehicle.totalSeats.toString());
      formData.append('description', this.vehicle.description);
      formData.append('price', this.vehicle.price.toString());
      formData.append('distance', this.vehicle.distance.toString());

      if (this.vehicle.img) {
        formData.append('img', this.dataURLtoBlob(this.vehicle.img), 'vehicleImage.jpg');
      }

      this.vehicleService.addVehicle(formData,currentUserId ).subscribe(
        (response: any) => {
          console.log('Vehicle added successfully:', response);
          if (response?.message) {
        
          } else {
            Swal.fire({
              title: 'Success!',
              text: 'Vehicle added successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
            this.route.navigate(['companyFirstView'],{ queryParams: { userId: currentUserId } }); 
            });
          }
        },
        error => {
          console.error('Error adding vehicle:', error);
          alert('Failed to add vehicle. Please try again.');
        }
      );
    }
  }

  getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

}
