import { Injectable } from '@angular/core';
import baseUrl from './Url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: any;

  constructor(private http: HttpClient) {}
  googleLogin(idToken: string) {
    return this.http.post(`${this.baseUrl}/google-login`, { idToken });
  }
  
  public generateTokens(login: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${baseUrl}/authenticate`, login, { headers })
      .pipe(
        catchError(this.handleError),
        map((response: any) => {
          const token = response.token;
          this.logIn(token);
          this.setUsers(response.user); 
          return response;
        })
      );
  }
  public getCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('JWT token is missing!');
      return throwError(() => new Error('JWT token is missing!'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${baseUrl}/current-user`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Log in by storing the token
  public logIn(token: string): void {
    localStorage.setItem('token', token);
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!(token && token.trim() !== '');
  }

  // Log out the user
  public loggedOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Retrieve the token from localStorage
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Store user information in localStorage
  public setUsers(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Retrieve user information from localStorage
  public getUser(): any | null {
    const userValue = localStorage.getItem('user');
    return userValue ? JSON.parse(userValue) : null;
  }

  // Retrieve the user's role
  public getUserRole(): string | null {
    const user = this.getUser();
    return user?.role ?? null;
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}