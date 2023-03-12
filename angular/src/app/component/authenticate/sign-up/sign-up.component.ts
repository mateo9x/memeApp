import {Component} from '@angular/core';
import {SignUpFormService} from "./sign-up.form.service";
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ToastService} from "../../../service/toast/toast.services";
import {Router} from "@angular/router";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form: FormGroup;

  constructor(private userService: UserService, private formService: SignUpFormService, private toastService: ToastService,
              private router: Router) {
    this.form = this.formService.getFormGroup();
  }

  signUp() {
    const request = this.formService.convertFormToUser(this.form);
    this.userService.saveUser(request).subscribe({
      next: () => {
        this.router.navigate(['']).then(() => {
          this.formService.clearForm(this.form);
          this.toastService.createSuccessToast('Użytkownik zarejestrowany pozytywnie');
        });
      },
      error: () => {
        this.toastService.createErrorToast('Rejestracja nie powiodła się');
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
          this.username?.setErrors({userExists: 'Użytkownik z takim loginem już istnieje!'});
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
          this.email?.setErrors({emailExists: 'Użytkownik z takim adresem e-mail już istnieje!'});
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

  clearForm() {
    this.formService.clearForm(this.form);
  }

}
