import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AuthenticateService} from "../service/authenticate.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(protected authenticateService: AuthenticateService) {
  }


  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    if (token && httpRequest.url.includes('api/')) {
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
