import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './Url';

@Injectable({
  providedIn: 'root'
})
export class BusStopsService {

  constructor(private http: HttpClient) {}
  getBusStops(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${baseUrl}/api/stop/all`,{headers});
  }
  addBusStops(formData:Object,busId:String): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.post<any[]>(`${baseUrl}/api/stop/add/${busId}`,formData,{headers});
  }
  getBusStopsById(stopId:String): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${baseUrl}/api/stop/${stopId}`,{headers});
  }
}
