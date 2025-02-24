import { Component } from '@angular/core';
import { BusesService } from '../../../service/buses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-bus',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-bus.component.html',
  styleUrl: './user-bus.component.css'
})
export class UserBusComponent {
  buses: any[] = [];
  userId:String | null =null;
  displayedBuses: any[] = [];
  allBusesDisplayed: boolean = false;

  constructor(private busService: BusesService, private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] ?? null;
      if (this.userId) {
        this.getUserBuses();
      }
    });
  }

  getUserBuses(): void {
    if (!this.userId) {
      console.error('User ID is null. Cannot fetch buses.');
      return;
    }
  
    this.busService.getBusByUserId(this.userId).subscribe(
      (data) => {
        this.buses = data;
        this.displayedBuses = this.buses.slice(0, 4); 
        this.allBusesDisplayed = this.buses.length <= 4;
        this.triggerCardAnimations();
      },
      (error) => {
        console.error('Error fetching buses:', error);
      }
    );
  }
  loadMoreBuses(): void {
    const nextBuses = this.buses.slice(this.displayedBuses.length, this.displayedBuses.length + 4);
    this.displayedBuses = [...this.displayedBuses, ...nextBuses];

    if (this.displayedBuses.length === this.buses.length) {
      this.allBusesDisplayed = true;
       
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
    selectBus(busId: number): void {
      console.log('Selected Bus ID:', busId);
      this.router.navigate(['/userBus'], { queryParams: { userId: this.userId }});
    }
  
    updateBus(busId: number): void {
      this.router.navigate(['/updateBus'],{ queryParams: { userId: this.userId, busId:busId }});
    }
  
    deleteBus(busId: number): void {
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
          this.busService.deleteBus(busId).subscribe(
            (response) => {
              if (response && response.includes('Bus deleted successfully')) {
                Swal.fire('Deleted!', 'The bus has been deleted.', 'success');
                this.buses = this.buses.filter(bus => bus.busId !== busId);
                this.displayedBuses = this.buses.slice(0, 4);
                this.allBusesDisplayed = this.buses.length <= 4;
              } else {
                Swal.fire('Error!', 'There was an issue deleting the bus.', 'error');
              }
            },
            (error) => {
              Swal.fire('Error!', 'There was an issue deleting the bus.', 'error');
              console.error('Error deleting bus:', error);
            }
          );
        }
      });
    }
    
    

}
