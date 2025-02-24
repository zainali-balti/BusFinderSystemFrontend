import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-vehicles',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-vehicles.component.html',
  styleUrl: './user-vehicles.component.css'
})
export class UserVehiclesComponent {
 vehicles: any[] = [];
  userId:number | null =null;
  displayedVehicles: any[] = [];
  allVehiclesDisplayed: boolean = false;

  constructor(private vehicleService: UserService, private router:Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'] ? Number(params['userId']) : null;
      console.log('Extracted userId:', this.userId);
    });
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(
      (data) => {
        this.vehicles = data;
        console.log(this.vehicles);
        this.displayedVehicles = this.vehicles.slice(0, 4); 
        this.allVehiclesDisplayed = this.vehicles.length <= 4;
        this.triggerCardAnimations();
      },
      (error) => {
        console.error('Error fetching buses:', error);
      }
    );
  }
  loadMoreBuses(): void {
    const nextBuses = this.vehicles.slice(this.displayedVehicles.length, this.displayedVehicles.length + 4);
    this.displayedVehicles = [...this.displayedVehicles, ...nextBuses];

    if (this.displayedVehicles.length === this.vehicles.length) {
      this.allVehiclesDisplayed = true;
       
    }
    this.triggerCardAnimations(); 
  }
    triggerCardAnimations(): void {
      setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card: any) => {
          card.classList.add('show');
        });
      }, 100);  
    }
    selectVehicle(vehicleId: number): void {
      console.log('Selected Vehicle ID:', vehicleId);
       this.router.navigate(['/userVehicles'], { queryParams: { userId: this.userId }});
    }
  
    updateVehicle(vehicleId: number): void {
      this.router.navigate(['/updateVehicles'],{ queryParams: { userId: this.userId, vehicleId:vehicleId }});
    }
  
    deleteVehicle(vehicleId: number): void {
      if (!vehicleId || !this.userId) {
        Swal.fire('Error!', 'Invalid vehicle ID.', 'error');
        return;
      }
    
      const safeUserId = this.userId as number;
    
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.vehicleService.deleteVehicles(vehicleId, safeUserId).subscribe(
            (response) => {
              console.log('Delete response:', response); // Debugging
    
              // ✅ Check if response contains a message
              const successMessage = response?.message || response;
              if (typeof successMessage === 'string' && successMessage.includes('deleted successfully')) {
                Swal.fire('Deleted!', 'The vehicle has been deleted.', 'success');
    
                this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicleId !== vehicleId);
                this.displayedVehicles = this.vehicles.slice(0, 4);
                this.allVehiclesDisplayed = this.vehicles.length <= 4;
              } else {
                Swal.fire('Error!', 'There was an issue deleting the vehicle.', 'error');
              }
            },
            (error) => {
              console.error('Error deleting vehicle:', error);
              Swal.fire('Error!', 'There was an issue deleting the vehicle.', 'error');
            }
          );
        }
      });
    }
    
}
