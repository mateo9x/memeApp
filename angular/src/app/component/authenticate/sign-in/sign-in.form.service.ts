import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {AuthenticateRequest} from "../../../model/authenticate-request";

@Injectable({
  providedIn: 'root'
})
export class SignInFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: this.getValidatorsForUsername(),
      password: this.getValidatorsForPassword(),
      rememberMe: this.getValidatorsForRememberMe()
    });
  }

  public getFormGroup(): FormGroup {
    return this.form;
  }

  private getValidatorsForUsername() {
    return [null, [Validators.required]];
  }

  private getValidatorsForPassword() {
    return [null, [Validators.required, Validators.minLength(5)]];
  }

  private getValidatorsForRememberMe() {
    return [false, [Validators.required]];
  }

  public convertFormToAuthenticationRequest(fb: FormGroup): AuthenticateRequest {
    let request = new AuthenticateRequest();
    request.username = this.convertFormToUsername(this.getUsernameControl(fb));
    request.password = this.convertFormToPassword(this.getPasswordControl(fb));
    request.rememberMe = this.convertFormToRememberMe(this.getRememberMeControl(fb));
    return request;
  }

  private getUsernameControl(fb: FormGroup): any {
    return fb.get('username');
  }

  private getPasswordControl(fb: FormGroup): any {
    return fb.get('password');
  }

  private getRememberMeControl(fb: FormGroup): any {
    return fb.get('rememberMe');
  }

  private convertFormToUsername(control: AbstractControl): string {
    return control.value;
  }

  private convertFormToPassword(control: AbstractControl): string {
    return control.value;
  }

  private convertFormToRememberMe(control: AbstractControl): boolean {
    return control.value;
  }

  public isFormValid(form: FormGroup) {
    return form.status === 'VALID';
  }

  public clearForm(fb: FormGroup) {
    this.getUsernameControl(fb).setValue(null);
    this.getPasswordControl(fb).setValue(null);
  }

}
