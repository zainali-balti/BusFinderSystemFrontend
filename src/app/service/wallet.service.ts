import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './Url';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }
  getWalletByUserId(userId:any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${baseUrl}/api/wallet/${userId}`, { headers });
  }
  getTransactionsByWalletId(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${baseUrl}/api/wallet/transactions/${userId}`, { headers });
  }
  deleteTransaction(transactionId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${baseUrl}/api/wallet/transactions/${transactionId}`, { headers });
  }
}
