import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {User} from "../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: this.getValidatorsForFirstnameOrLastName(),
      lastname: this.getValidatorsForFirstnameOrLastName(),
      username: this.getValidatorsEmpty(),
      email: this.getValidatorsEmpty(),
      password: this.getValidatorsEmpty(),
      language: this.getValidatorsForLanguage(),
    });
  }

  public getFormGroup(): FormGroup {
    return this.form;
  }

  public prepareForm(user: User, form: FormGroup) {
    this.getUsernameControl(form)?.setValue(user.username);
    this.getUsernameControl(form)?.disable();
    this.getEmailControl(form)?.setValue(user.email);
    this.getEmailControl(form)?.disable();
    this.getPasswordControl(form)?.setValue(user.password);
    this.getPasswordControl(form)?.disable();
    this.getFirstnameControl(form).setValue(user.firstname);
    this.getLastnameControl(form).setValue(user.lastname);
    this.getLanguageControl(form).setValue(user.language);
  }

  private getValidatorsEmpty() {
    return [null, []];
  }

  private getValidatorsForFirstnameOrLastName() {
    return [null, [Validators.required]];
  }

  private getValidatorsForLanguage() {
    return [null, [Validators.required]];
  }

  public convertFormToUser(fb: FormGroup, user: User): User {
    user.firstname = this.convertFormToString(this.getFirstnameControl(fb));
    user.lastname = this.convertFormToString(this.getLastnameControl(fb));
    user.language = this.convertFormToString(this.getLanguageControl(fb));
    return user;
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

  private getPasswordControl(fb: FormGroup): AbstractControl<any, any> | null {
    return fb.get('password');
  }

  private getLanguageControl(fb: FormGroup): any {
    return fb.get('language');
  }

  private convertFormToString(control: AbstractControl): string {
    return control.value;
  }

  public isFormValid(form: FormGroup) {
    return form.status === 'VALID';
  }

}
