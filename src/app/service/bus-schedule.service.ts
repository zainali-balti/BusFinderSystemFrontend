import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './Url';

@Injectable({
  providedIn: 'root'
})
export class BusScheduleService {
  constructor(private http: HttpClient) {}
  addBusSchedule(formData:Object): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.post<any[]>(`${baseUrl}/api/schedule/add`,formData,{headers});
  }
  getBusSchedule(routeId:String,busId:String,stopId:String,): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${baseUrl}/api/schedule/${routeId}/${busId}/${stopId}`,{headers});
  }
  
}
