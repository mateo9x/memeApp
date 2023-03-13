import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {FormGroup} from "@angular/forms";
import {ProfileSettingsFormService} from "./profile-settings.form.service";
import {ToastService} from "../../../service/toast/toast.services";
import {DialogService} from "primeng/dynamicdialog";
import {NewPasswordDialogComponent} from "./new-password-dialog/new-password-dialog.component";

@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  user: User;
  form: FormGroup;
  languages = [{label: 'Polski', value: 'pl'},
    {label: 'English', value: 'en'}];

  constructor(private userService: UserService, private formService: ProfileSettingsFormService,
              private toastService: ToastService, private dialogService: DialogService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.userService.getUserLogged().subscribe({
      next: (response) => {
        this.user = response;
        this.prepareForm();
      }
    });
  }

  prepareForm() {
    this.formService.prepareForm(this.user, this.form);
  }

  openPasswordDialog() {
    let refData = this.dialogService.open(NewPasswordDialogComponent, {
      data: this.user
    });
    refData.onClose.subscribe({
      next: (response) => {
        if (response.password) {
          this.userService.updateUserPassword(this.user.id, response.password).subscribe({
            next: (booleanResponse) => {
              if (booleanResponse) {
                this.toastService.createSuccessToast('Hasło zaaktualizowane pomyślnie');
              }
            },
            error: () => {
              this.toastService.createErrorToast('Aktualizacja hasła nie powiodła się');
            }
          });
        }
      }
    });
  }

  update() {
    this.formService.convertFormToUser(this.form, this.user);
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        this.user = response;
        this.toastService.createSuccessToast('Dane zaaktualizowane pomyślnie');
      },
      error: () => {
        this.toastService.createErrorToast('Aktualizacja danych nie powiodła się');
      }
    });
  }

  isFormValid() {
    return this.formService.isFormValid(this.form);
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

  get language() {
    return this.form.get('language');
  }

}
