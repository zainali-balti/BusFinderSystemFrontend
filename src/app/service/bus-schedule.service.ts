import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './Url';

@Injectable({
  providedIn: 'root'
})
export class BusScheduleService {
  constructor(private http: HttpClient) {}
  addBusSchedule(formData:Object,busId:String,stopId:String,routeId:String): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return this.http.post<any[]>(`${baseUrl}/api/schedule/add/${busId}/${stopId}/${routeId}`,formData,{headers});
  }
}
