import {Injectable, Injector} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(request, next) {
    const authService = this.injector.get(AuthService);
    if (!authService.loggedIn()) {
      return next.handle(request);
    } else {
      console.log('=========', authService.getToken());
      const tokenizedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      });
      return next.handle(tokenizedRequest);
    }
  }
}
