import {Injectable} from "@angular/core";
import {TokenService} from "../service/token.service";

@Injectable()
export class LoginGuard {
  constructor(private tokenService: TokenService) {
  }

  canActivate() {
    const token = this.tokenService.getToken();
    const tokenValid = this.tokenService.isTokenValid();
    return !!(token && tokenValid);
  }

}
