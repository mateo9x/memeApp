import {Injectable} from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public saveToken(token: any, rememberMe: boolean) {
    //rememberMe 86400(1day) else 3600 (1hour)
    const expiresAt = moment().add(rememberMe ? 86400 : 3600, 'second');
    localStorage.setItem('token', token);
    localStorage.setItem('token_expire', JSON.stringify(expiresAt));
  }

  public removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expire');
  }

  public isTokenValid(): boolean {
      return moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem("token_expire");
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return 0;
  }

}
