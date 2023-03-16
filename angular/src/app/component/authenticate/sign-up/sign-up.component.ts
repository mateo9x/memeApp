import {Component} from '@angular/core';
import {SignUpFormService} from "./sign-up.form.service";
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";
import {LanguageService} from "../../../service/language.service";
import {SpinnerService} from "../../../service/spinner/spinner.service";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form: FormGroup;
  languages = [{label: 'Polski', value: 'pl'}, {label: 'English', value: 'en'}];

  constructor(private userService: UserService, private formService: SignUpFormService, private toastService: ToastService,
              private router: Router, private languageService: LanguageService, private spinnerService: SpinnerService) {
    this.form = this.formService.getFormGroup();
  }

  signUp() {
    this.spinnerService.setSpinnerLoading(true);
    const request = this.formService.convertFormToUser(this.form);
    this.userService.saveUser(request).subscribe({
      next: () => {
        this.router.navigate(['']).then(() => {
          this.formService.clearForm(this.form);
          this.spinnerService.setSpinnerLoading(false);
          this.toastService.createSuccessToast(this.languageService.getMessage('authentication.sign-up.userCreatedSuccess'));
        });
      },
      error: () => {
        this.spinnerService.setSpinnerLoading(false);
        this.toastService.createErrorToast(this.languageService.getMessage('authentication.sign-up.userCreatedError'));
      }
    });
  }

  isFormValid() {
    return this.formService.isFormValid(this.form);
  }

  doesBothPasswordMatches() {
    return this.password?.value === this.password2?.value;
  }

  checkIfUserWithUsernameExists() {
    const username = this.username?.value;
    this.userService.getUserByUsername(username).subscribe({
      next: (response) => {
        if (response) {
          this.username?.setErrors({userExists: this.languageService.getMessage('authentication.sign-up.placeholders.errors.usernameExists')});
        } else {
          this.username?.setErrors({userExists: null});
          this.username?.updateValueAndValidity();
        }
      }
    });
  }

  checkIfUserWithEmailExists() {
    const email = this.email?.value;
    this.userService.getUserByEmail(email).subscribe({
      next: (response) => {
        if (response) {
          this.email?.setErrors({emailExists: this.languageService.getMessage('authentication.sign-up.placeholders.errors.emailExists')});
        } else {
          this.email?.setErrors({emailExists: null});
          this.email?.updateValueAndValidity();
        }
      }
    });
  }

  get firstname() {
    return this.form.get('firstname');
  }


  get lastname() {
    return this.form.get('lastname');
  }


  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get password2() {
    return this.form.get('password2');
  }

  get selectedLanguage() {
    return this.form.get('selectedLanguage');
  }

  clearForm() {
    this.formService.clearForm(this.form);
  }

}
