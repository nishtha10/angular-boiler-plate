import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  apiPreFix: string = environment.apiServiceUrl;
  url: string;
  jwtToken: string;
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.jwtToken = this.authService.currentTokenValue
      ? this.authService.currentTokenValue
      : null;

    if (request.url) {
      this.url = this.apiPreFix + request.url;
    }
    request = request.clone({
      url: this.url,
    });
    if (this.jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: this.jwtToken,
        },
      });
    }
    return next.handle(request);
  }
}
