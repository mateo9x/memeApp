import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";
import {ForgotPasswordFormService} from "./forgot-password.form.service";

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  form: FormGroup;

  constructor(private userService: UserService, private formService: ForgotPasswordFormService, private toastService: ToastService,
              private router: Router) {
    this.form = this.formService.getFormGroup();
  }

  resetPassword() {
    const email = this.formService.getEmailValue(this.form);
    this.userService.getUserByEmail(email).subscribe({
      next: (response) => {
        if (response) {
          this.userService.startResetPasswordProcedure(email).subscribe({
            next: () => {
              this.router.navigate(['']).then(() => {
                this.toastService.createSuccessToast('Link do odzyskania hasła został przesłany na wskazany adres e-mail. Zaloguj się, żeby kontynuować proces odzyskiwania hasła');
              });
            },
            error: () => {
              this.toastService.createErrorToast('Nie udało wygenerować się tokenu resetującego hasła');
            }
          });
        } else {
          this.toastService.createWarnToast('Użytkownik z podanym adresem e-mail nie istnieje');
        }
      }
    });
  }

  isFormValid() {
    return this.formService.isFormValid(this.form);
  }

  get email() {
    return this.form.get('email');
  }

}
