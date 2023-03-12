import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: this.getValidatorsForEmail()
    });
  }

  public getFormGroup(): FormGroup {
    return this.form;
  }

  private getValidatorsForEmail() {
    return [null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]];
  }

  public getEmailValue(fb: FormGroup): string {
    return this.convertFormToString(this.getEmailControl(fb));
  }

  private getEmailControl(fb: FormGroup): any {
    return fb.get('email');
  }

  private convertFormToString(control: AbstractControl): string {
    return control.value;
  }

  public isFormValid(form: FormGroup) {
    return form.status === 'VALID';
  }

  public clearForm(fb: FormGroup) {
    this.getEmailControl(fb).setValue(null);
  }

}
