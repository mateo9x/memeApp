import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APP_BASE_URL} from "../app.service";
import {AuthenticateRequest} from "../model/authenticate-request";
import {ToastService} from "./toast.services";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private toastService: ToastService, private userService: UserService,
              private router: Router) {
  }

  public authenticateUser(request: AuthenticateRequest) {
    this.http.post<any>(`${APP_BASE_URL}/authenticate`, request).subscribe({
      next: (response) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          this.userService.getUserLogged().subscribe({
            next: (userResponse) => {
              this.userService.userLogged.next(userResponse);
              this.router.navigate(['']).then(() => {
                this.toastService.createSuccessToast('Zalogowano pomyślnie');
              });
            }
          });
        }
      },
      error: () => {
        this.toastService.createErrorToast('Logowanie nieudane');
      }
    });
  }

  public logoutUser() {
    this.http.post<any>(`${APP_BASE_URL}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.userService.userLogged.next(null);
        this.router.navigate(['']).then(() => {
          this.toastService.createSuccessToast('Wylogowano pomyślnie');
        });
      },
      error: () => {
        this.toastService.createErrorToast('Wylogowanie nieudane');
      }
    });
  }

}
