import {Injectable} from "@angular/core";
import {TokenService} from "../service/token.service";

@Injectable()
export class AnonymousGuard {
  constructor(private tokenService: TokenService) {
  }

  canActivate() {
    const token = this.tokenService.getToken();
    return token === null;
  }

}
