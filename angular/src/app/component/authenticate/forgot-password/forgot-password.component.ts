import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";
import {ForgotPasswordFormService} from "./forgot-password.form.service";
import {LanguageService} from "../../../service/language.service";
import {SpinnerService} from "../../../service/spinner/spinner.service";

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  form: FormGroup;

  constructor(private userService: UserService, private formService: ForgotPasswordFormService, private toastService: ToastService,
              private router: Router, private languageService: LanguageService, private spinnerService: SpinnerService) {
    this.form = this.formService.getFormGroup();
  }

  resetPassword() {
    this.spinnerService.setSpinnerLoading(true);
    const email = this.formService.getEmailValue(this.form);
    this.userService.getUserByEmail(email).subscribe({
      next: (response) => {
        if (response) {
          this.userService.startResetPasswordProcedure(email).subscribe({
            next: () => {
              this.router.navigate(['']).then(() => {
                this.spinnerService.setSpinnerLoading(false);
                this.toastService.createSuccessToast(this.languageService.getMessage('authentication.forgot-password.startResetProcedureSuccess'));
              });
            },
            error: () => {
              this.spinnerService.setSpinnerLoading(false);
              this.toastService.createErrorToast(this.languageService.getMessage('authentication.forgot-password.startResetProcedureError'));
            }
          });
        } else {
          this.spinnerService.setSpinnerLoading(false);
          this.toastService.createWarnToast(this.languageService.getMessage('authentication.forgot-password.userDoesntExist'));
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
