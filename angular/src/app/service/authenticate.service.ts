import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APP_BASE_URL} from "../app.service";
import {AuthenticateRequest} from "../model/authenticate-request";
import {ToastService} from "./toast/toast.services";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private toastService: ToastService, private userService: UserService,
              private router: Router, private tokenService: TokenService, private languageService: LanguageService) {
  }

  public authenticateUser(request: AuthenticateRequest) {
    this.http.post<any>(`${APP_BASE_URL}/authenticate`, request).subscribe({
      next: (response) => {
        const token = response.token;
        if (token) {
          this.tokenService.saveToken(token, request.rememberMe);
          this.userService.getUserLogged().subscribe({
            next: (userResponse) => {
              this.userService.userLogged.next(userResponse);
              this.setLanguage(userResponse.language);
              this.router.navigate(['']).then(() => {
                this.toastService.createSuccessToast(this.languageService.getMessage('authentication.sign-in.success'));
              });
            }
          });
        }
      },
      error: () => {
        this.toastService.createErrorToast(this.languageService.getMessage('authentication.sign-in.error'));
      }
    });
  }

  public logoutUser(errorLoggedOut?: boolean) {
    this.http.post<any>(`${APP_BASE_URL}/logout`, {}).subscribe({
      next: () => {
        this.tokenService.removeToken();
        this.userService.userLogged.next(null);
        this.router.navigate(['']).then(() => {
          if (errorLoggedOut) {
            window.location.reload();
          } else {
            this.toastService.createSuccessToast(this.languageService.getMessage('authentication.logout.success'));
          }
        });
      },
      error: () => {
        this.toastService.createErrorToast(this.languageService.getMessage('authentication.logout.error'));
      }
    });
  }

  private setLanguage(language: string) {
    this.languageService.setUserLanguage(language);
    this.languageService.saveLanguage(language);
  }

}
