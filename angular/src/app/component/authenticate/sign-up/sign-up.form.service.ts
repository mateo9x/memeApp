import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {User} from "../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: this.getValidatorsForFirstnameOrLastName(),
      lastname: this.getValidatorsForFirstnameOrLastName(),
      username: this.getValidatorsForUsername(),
      email: this.getValidatorsForEmail(),
      password: this.getValidatorsForPassword(),
      password2: this.getValidatorsForPassword()
    });
  }

  public getFormGroup(): FormGroup {
    return this.form;
  }

  private getValidatorsForFirstnameOrLastName() {
    return [null, [Validators.required]];
  }

  private getValidatorsForUsername() {
    return [null, [Validators.required]];
  }

  private getValidatorsForPassword() {
    return [null, [Validators.required, Validators.minLength(5)]];
  }

  private getValidatorsForEmail() {
    return [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]];
  }

  public convertFormToUser(fb: FormGroup): User {
    let request = new User();
    request.firstname = this.convertFormToString(this.getFirstnameControl(fb));
    request.lastname = this.convertFormToString(this.getLastnameControl(fb));
    request.username = this.convertFormToString(this.getUsernameControl(fb));
    request.email = this.convertFormToString(this.getEmailControl(fb));
    request.password = this.convertFormToString(this.getPasswordControl(fb));
    request.password2 = this.convertFormToString(this.getPassword2Control(fb));
    return request;
  }

  private getFirstnameControl(fb: FormGroup): any {
    return fb.get('firstname');
  }

  private getLastnameControl(fb: FormGroup): any {
    return fb.get('lastname');
  }

  private getUsernameControl(fb: FormGroup): any {
    return fb.get('username');
  }

  private getEmailControl(fb: FormGroup): any {
    return fb.get('email');
  }

  private getPasswordControl(fb: FormGroup): any {
    return fb.get('password');
  }

  private getPassword2Control(fb: FormGroup): any {
    return fb.get('password2');
  }

  private convertFormToString(control: AbstractControl): string {
    return control.value;
  }

  public isFormValid(form: FormGroup) {
    return form.status === 'VALID';
  }

  public clearForm(fb: FormGroup) {
    this.getFirstnameControl(fb).setValue(null);
    this.getLastnameControl(fb).setValue(null);
    this.getUsernameControl(fb).setValue(null);
    this.getEmailControl(fb).setValue(null);
    this.getPasswordControl(fb).setValue(null);
    this.getPassword2Control(fb).setValue(null);
  }

}
