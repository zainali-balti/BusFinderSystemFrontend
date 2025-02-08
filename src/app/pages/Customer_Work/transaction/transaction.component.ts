import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../../service/wallet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusBookingComponent } from '../bus-booking/bus-booking.component';
import { BusBookingService } from '../../../service/bus-booking.service';

@Component({
  selector: 'app-transaction',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  userId: number | null = null;
  bookingId: number | null = null;

  walletDto = {
    balance: '',
    walletId: ''
  };
  transactions: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private walletSerive: WalletService,
    private busBookingService: BusBookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || '';
      this.bookingId = params['bookingId'] || '';
      if (this.userId) {
        this.fetchTransactionHistory(this.userId);
      } else {
        console.error('User ID not found in query params');
      }
    });

    this.walletSerive.getWalletByUserId(this.userId).subscribe(
      (response) => {
        this.walletDto = response;
        console.log(this.walletDto.walletId);  
      },
      (error) => {
        console.error('Error fetching wallet:', error); 
      }
    );
  }

  fetchTransactionHistory(userId: number) {
    this.walletSerive.getTransactionsByWalletId(userId).subscribe(
      (response) => {
        this.transactions = response.map((transaction: any) => ({
          ...transaction,
          transactionTime: new Date(transaction.transactionTime)  
        }));
        console.log('Transaction History:', this.transactions);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  deleteBooking(bookingId: number | null) {
    if (!bookingId) {
      console.error('No busBookingId found');
      return;
    }

    if (confirm(`Are you sure you want to delete booking with ID ${bookingId}?`)) {
      this.busBookingService.deleteBusBooking(bookingId).subscribe(
        () => {
          console.log(`Booking ${bookingId} deleted successfully`);
          alert(`Booking ${bookingId} deleted successfully`);
        },
        (error) => {
          console.error('Error deleting booking:', error);
        }
      );
    }
  }
}




