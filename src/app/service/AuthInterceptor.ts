import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service'; 
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getToken();
        let cloned = req;
        if (token) {
            cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Authorization Token Attached:', token); 
        } else {
            console.log('No Authorization Token Found'); 
        }

        return next.handle(cloned).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.error('Unauthorized request - possibly invalid or expired token.');
                    this.loginService.loggedOut();
                    this.router.navigate(['login']);
                }
                return throwError(() => error);
            })
        );
    }

}