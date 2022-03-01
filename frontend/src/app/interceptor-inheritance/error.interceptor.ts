import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, last } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        let errorMessage = 'Some errors occurred. Please contact your admin for more information';

        if (!err.response) {
          errorMessage =
            'A network error occurred. This could be a CORS issue or a dropped internet connection. Please contact your admin for more information.';
        }

        this.openSnackBar(errorMessage);
        return of([]);
      })
    );
  }

  openSnackBar(error: any) {
    return this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: error,
    });
    // 'Something went wrong due to the server. Try again later',
    //   'Close',
    //   {
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //     duration: 5000
    //   }
  }
}
