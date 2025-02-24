import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../../service/wallet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusBookingService } from '../../../service/bus-booking.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch wallet details.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
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
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch transaction history.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  deleteBooking(bookingId: number | null) {
    if (!bookingId) {
      console.error('No busBookingId found');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete booking with ID ${bookingId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.busBookingService.deleteBusBooking(bookingId).subscribe(
          () => {
            console.log(`Booking ${bookingId} deleted successfully`);
            Swal.fire({
              title: 'Deleted!',
              text: `Booking ${bookingId} has been deleted successfully.`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            console.error('Error deleting booking:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the booking. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}





