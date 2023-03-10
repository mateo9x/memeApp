import {Component, ElementRef, HostListener} from '@angular/core';
import {AuthenticateService} from "../../../services/authenticate.service";
import {SignInFormService} from "./sign-in.form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  expanded = false;
  form: FormGroup;

  constructor(private authenticateService: AuthenticateService, private formService: SignInFormService,
              private eRef: ElementRef) {
    this.form = this.formService.getFormGroup();
  }

  signIn() {
    const request = this.formService.convertFormToAuthenticationRequest(this.form);
    this.authenticateService.authenticateUser(request);
  }

  signInIfFormValid() {
    if (this.isFormValid()) {
      this.signIn();
    }
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get rememberMe() {
    return this.form.get('rememberMe');
  }

  isFormValid() {
    return this.formService.isFormValid(this.form);
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expanded = false;
    }
  }
}
