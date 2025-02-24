import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './Url';

@Injectable({
  providedIn: 'root'
})
export class BusBookingService {
  constructor(private http: HttpClient) {}
  addBusBooking(formData:Object): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.post<any[]>(`${baseUrl}/api/bus_booking/add`,formData,{headers});
  }
  deleteBusBooking(bookingId:number): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.delete<any[]>(`${baseUrl}/api/bus_booking/delete/${bookingId}`,{headers});
  }
  getBusBookingByUserId(userId:number): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${baseUrl}/api/bus_booking/user/${userId}`,{headers});
  }
}
