import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BusesService } from '../../../service/buses.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-bus',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-bus.component.html',
  styleUrl: './update-bus.component.css'
})
export class UpdateBusComponent {
  bus:any= {};
  busId:String | null = null;
  userId:String | null = null;
  
    constructor(private busService: BusesService, 
      private router:Router,private route:ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) {}
  
      ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
          this.busId = params['busId'] ?? null;
          this.userId = params['userId'] ?? null;
          console.log('User ID on init: ', this.userId);
          console.log('Bus ID on init: ', this.busId);
      
          if (this.userId) {
            this.bus.userId = this.userId;  // This should be passed in via queryParams
          }
      
          if (this.busId) {
            this.getBusById(this.busId);
          }
        });
      }
      
      getBusById(busId: String): void {
        if (!this.busId) {
          console.error('Bus ID is null. Cannot fetch buses.');
          return;
        }
      
        this.busService.getBus(this.busId).subscribe(
          (data) => {
            this.bus = data;
            console.log(this.bus);
            if (this.bus.user && this.bus.user.id) {
              this.bus.userId = this.bus.user.id;
            }
            this.changeDetectorRef.detectChanges();
          },
          (error) => {
            console.error('Error fetching buses:', error);
          }
        );
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
  
    onSubmit(form: NgForm){
      if (form.valid) {
            if (!this.bus.userId) { 
              Swal.fire({
                         title: 'User ID!',
                         text: 'Failed to Retrive User ID.',
                         icon: 'error',
                         confirmButtonText: 'OK'
                       });
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
      
            this.busService.updateBus(formData,this.bus.busId).subscribe(
              (response: any) => {
                console.log('Bus added successfully:', response);
                Swal.fire({
                              title: 'Success!',
                              text: 'Bus Updated successfully.',
                              icon: 'success',
                              confirmButtonText: 'OK'
                            }).then(() => {
                              this.router.navigate(['/userBus'],{ queryParams: { userId: this.userId } });
                            });
              },
              error => {
                console.error('Error Updating bus:', error);
                 Swal.fire({
                            title: 'Error!',
                            text: 'Failed to add Bus. Please Enter a Valid Bus Number.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                          });
              }
            );      
          }
    }
}
