import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NewPasswordFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: this.getValidatorsForPassword(),
      password2: this.getValidatorsForPassword()
    });
  }

  public getFormGroup(): FormGroup {
    return this.form;
  }

  private getValidatorsForPassword() {
    return [null, [Validators.required, Validators.minLength(5)]];
  }

  private getPasswordControl(fb: FormGroup): any {
    return fb.get('password');
  }

  private getPassword2Control(fb: FormGroup): any {
    return fb.get('password2');
  }

  public isFormValid(form: FormGroup) {
    return form.status === 'VALID';
  }

  public clearForm(fb: FormGroup) {
    this.getPasswordControl(fb).setValue(null);
    this.getPassword2Control(fb).setValue(null);
  }

}
