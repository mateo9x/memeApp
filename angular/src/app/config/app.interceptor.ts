import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AuthenticateService} from "../service/authenticate.service";
import {TokenService} from "../service/token.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(protected authenticateService: AuthenticateService, protected tokenService: TokenService) {
  }


  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();
    if (token && this.tokenService.isTokenValid()) {
      const newRequest = httpRequest.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
      return next.handle(newRequest).pipe(catchError((err, caught) => {
        if (err.status === 401 || err.status === 403 || err.status === 500) {
          this.authenticateService.logoutUser(true);
        }
        throw err;
      }));
    }
    return next.handle(httpRequest);

  }

}
