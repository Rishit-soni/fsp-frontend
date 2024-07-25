import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService)

    if (!request.url.includes('postalpincode')) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `${authService.getToken()}`,
        },
      })
    }
    return next.handle(request)
  }
}
