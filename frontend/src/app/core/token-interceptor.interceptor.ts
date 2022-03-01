import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => {
        const tokenReq = httpRequest.clone({
        setHeaders:{ Authorization: `Bearer ${token}`}
      });
      return next.handle(tokenReq);
    }));
  }
}
