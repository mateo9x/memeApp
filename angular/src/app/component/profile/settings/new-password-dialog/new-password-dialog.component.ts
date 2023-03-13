import {Component, OnInit} from "@angular/core";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'new-password-dialog',
  templateUrl: './new-password-dialog.component.html',
  styleUrls: ['./new-password-dialog.component.scss']
})
export class NewPasswordDialogComponent implements OnInit {

  user: User;
  form: FormGroup = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(5)]]
  });

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.user = this.config.data;
  }

  update() {
    this.ref.close({password: this.password?.value});
  }

  get password() {
    return this.form.get('password');
  }

  isFormValid() {
    return this.form.status === 'VALID';
  }

}
