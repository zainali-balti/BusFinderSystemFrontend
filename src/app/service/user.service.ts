import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './Url';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addUsers(user:any){
    return this.http.post( `${baseUrl}/sign-up`,user)
  }
  getUserById(userId:number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${baseUrl}/api/customer/${userId}`, { headers });
  }
}
