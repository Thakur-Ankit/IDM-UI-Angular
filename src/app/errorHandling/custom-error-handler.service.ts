import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector, private ngZone: NgZone) {
  }

  handleError(error): void {
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        localStorage.removeItem('token');
        this.ngZone.run(() => router.navigate(['/login']));
      } else if (error.status === 403) {
        localStorage.removeItem('token');
        this.ngZone.run(() => router.navigate(['/login']));
      }
    }
  }
}
