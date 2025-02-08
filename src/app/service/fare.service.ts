import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './Url';

@Injectable({
  providedIn: 'root'
})
export class FareService {
constructor(private http: HttpClient) {}

  addFares(formData:any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${baseUrl}/api/fare/add`, formData, { headers });
  }
  getAllBusesBySourceAndDestination(formData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Use HttpParams to send data in query parameters
    const params = new HttpParams()
      .set('sourceId', formData.sourceStopId)
      .set('destinationId', formData.destinationStopId);
  
    return this.http.get(`${baseUrl}/api/fare/buses`, { headers, params });
  }
  
  getAllfaresByBusId(busId:number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${baseUrl}/api/fare/bus/${busId}`, { headers });
  }
}
