import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {FormGroup} from "@angular/forms";
import {ProfileSettingsFormService} from "./profile-settings.form.service";
import {ToastService} from "../../../service/toast/toast.services";
import {DialogService} from "primeng/dynamicdialog";
import {NewPasswordDialogComponent} from "./new-password-dialog/new-password-dialog.component";
import {LanguageService} from "../../../service/language.service";

@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  formSaved = true;
  user: User;
  form: FormGroup;
  languages = [{label: 'Polski', value: 'pl'},
    {label: 'English', value: 'en'}];

  constructor(private userService: UserService, private formService: ProfileSettingsFormService,
              private toastService: ToastService, private dialogService: DialogService,
              private languageService: LanguageService) {
    this.form = this.formService.getFormGroup();

  }

  ngOnInit() {
    this.userService.userLogged.subscribe({
      next: (response) => {
        this.user = response;
        this.languageService.setUserLanguage(response.language);
        this.prepareForm();
      }
    });
  }

  prepareForm() {
    this.formService.prepareForm(this.user, this.form);
  }

  changeLanguage() {
    this.languageService.setUserLanguage(this.language?.value);
    this.formSaved = false;
  }

  openPasswordDialog() {
    let refData = this.dialogService.open(NewPasswordDialogComponent, {
      data: this.user
    });
    refData.onClose.subscribe({
      next: (response) => {
        if (response && response.password) {
          this.userService.updateUserPassword(this.user.id, response.password).subscribe({
            next: (booleanResponse) => {
              if (booleanResponse) {
                this.toastService.createSuccessToast(this.languageService.getMessage('profile.settings.passwordUpdate.success'));
              }
            },
            error: () => {
              this.toastService.createErrorToast(this.languageService.getMessage('profile.settings.passwordUpdate.error'));
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
        this.formSaved = true;
        this.user = response;
        this.languageService.setUserLanguage(response.language);
        this.languageService.saveLanguage(response.language);
        this.toastService.createSuccessToast(this.languageService.getMessage('profile.settings.formUpdate.success'));
      },
      error: () => {
        this.toastService.createErrorToast(this.languageService.getMessage('profile.settings.formUpdate.error'));
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
