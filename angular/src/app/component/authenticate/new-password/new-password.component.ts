import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";
import {NewPasswordFormService} from "./new-password.form.service";
import {User} from "../../../model/user";

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(private userService: UserService, private formService: NewPasswordFormService, private toastService: ToastService,
              private router: Router) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    const url = this.router.routerState.snapshot.url;
    const resetToken = url.substring(14, url.length - 1);
    this.userService.getUserByResetToken(resetToken).subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
        } else {
          this.toastService.createWarnToast('Token stracił swoją ważność, wygeneruj nowy');
        }
      }
    });
  }

  saveNewPassword() {
    const data = {email: this.user.email, password: this.password?.value};
    this.userService.finishResetPasswordProcedure(data).subscribe({
      next: () => {
        this.router.navigate(['']).then(() => {
          this.toastService.createSuccessToast('Nowe hasło zapisane pomyślnie');
        });
      }
    });
  }

  isFormValid() {
    return this.formService.isFormValid(this.form);
  }

  get password() {
    return this.form.get('password');
  }

  get password2() {
    return this.form.get('password2');
  }

  doesBothPasswordMatches() {
    return this.password?.value === this.password2?.value;
  }

}
