import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-vehicles',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-vehicles.component.html',
  styleUrl: './update-vehicles.component.css'
})
export class UpdateVehiclesComponent {
  userId:number | null = null;
  vehicleId:number |null = null;
  vehicle: any= {};

  constructor(private vehicleService: UserService, private router:Router,private activatedRoute:ActivatedRoute,  
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? Number(params['userId']) : null;
      this.vehicleId = params['vehicleId'] ? Number(params['vehicleId']) : null;
      console.log('Extracted userId:', this.userId);
      console.log('Extracted vehicleId:', this.vehicleId);
      if (this.userId) {
        this.vehicle.ownerId = this.userId;  
      }
  
      if (this.vehicleId) {
        this.getVehicleById(this.vehicleId);
      }
    });
  }
  getVehicleById(vehicleId:number): void {
    if (!vehicleId) {
      console.error('Vehicle ID is null. Cannot fetch vehicle.');
      return;
    }

    this.vehicleService.getVehicle(vehicleId).subscribe(
      (data) => {
        this.vehicle = data;  
        console.log(this.vehicle); 
        this.changeDetectorRef.detectChanges(); 
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }
  onSubmit(vehicleForm: NgForm): void {
    if (vehicleForm.valid) {
      const formData = new FormData();
      formData.append('vehicleName', this.vehicle.vehicleName); // Append each property individually
      formData.append('color', this.vehicle.color);
      formData.append('engineNo', this.vehicle.engineNo);
      formData.append('modelNo', this.vehicle.modelNo);
      formData.append('totalSeats', this.vehicle.totalSeats.toString());
      formData.append('description', this.vehicle.description);
      formData.append('price', this.vehicle.price.toString());
      formData.append('distance', this.vehicle.distance.toString());
      formData.append('userId', this.userId!.toString());
      formData.append('vehicleId', this.vehicleId!.toString());
  
      // Append the image file if present
      if (this.vehicle.img) {
        formData.append('img', this.vehicle.img); // Append image file here
      }
  
      this.vehicleService.updatedVehicle(this.vehicleId!, this.userId!, formData).subscribe(
        (response) => {
          Swal.fire('Success', 'Vehicle updated successfully!', 'success');
          this.router.navigate(['/userVehicles']);
        },
        (error) => {
          console.error('Error updating vehicle:', error);
          Swal.fire('Error', 'There was an issue updating the vehicle.', 'error');
        }
      );
    }
  }
  

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.vehicle.img = file;  // Set the selected file
      this.previewImage(file);  // Optionally preview the image
    }
  }
  
  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.vehicle.returnedImg = reader.result as string; // Preview the image as data URL
    };
    reader.readAsDataURL(file);
  }
  

}
