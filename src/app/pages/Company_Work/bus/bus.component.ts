import { Component, OnInit } from '@angular/core';
import { BusesService } from '../../../service/buses.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bus',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css'
})
export class BusComponent implements OnInit {

  userId: string | null = null;
  bus = {
    busId: '',
    busName: '',
    busNumber: '',
    capacity: 0,
    img: null,
    userId: '',
    status:'Active'
  };

  constructor(
    private busService: BusesService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {  
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId) {
        this.bus.userId = this.userId;
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bus.img = e.target.result;
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
      if (!this.bus.userId) { 
        alert('User ID is missing!');
        return;
      }
      
      const formData = new FormData();
      formData.append('busName', this.bus.busName);
      formData.append('busNumber', this.bus.busNumber);
      formData.append('capacity', this.bus.capacity.toString());
      formData.append('userId', this.bus.userId); 
      formData.append('status', this.bus.status);

      if (this.bus.img) {
        formData.append('img', this.dataURLtoBlob(this.bus.img), 'busImage.jpg');
      }

      this.busService.addBus(formData).subscribe(
        (response: any) => {
          console.log('Bus added successfully:', response);
          Swal.fire({
                        title: 'Success!',
                        text: 'Bus created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(() => {
                        this.router.navigate(['/route', response.busId]);
                      });
        },
        error => {
          console.error('Error adding bus:', error);
          alert('Failed to add bus. Please try again.');
        }
      );      
    }
  }
}
