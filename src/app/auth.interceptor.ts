import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = "ass"
    if(token){
      const modifiedRequest = request.clone({ headers:request.headers.set('Authorization',`brearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFsaWZhdGh5OTkiLCJ1c2VySWQiOiI2NDhiMDU4YTViMWIxYTkzYzA3NjAxYjgiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODg2NjU0MTMsImV4cCI6MTY4OTI3MDIxM30.ROA0x_5u6cAjtIf4f75QO1EFW9JcDJISusFLYhrdeCA`) })
      return next.handle(modifiedRequest).pipe(
        tap((response) => {
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }
}
