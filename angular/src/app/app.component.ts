import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./service/user.service";
import {User} from "./model/user";
import {Subscription} from "rxjs";
import {MenuItem} from "primeng/api";
import {ThemeService} from "./service/theme/theme.service";
import {LanguageService} from "./service/language.service";
import {SpinnerService} from "./service/spinner/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  spinnerLoading = false;
  language: string;
  polishLanguage = 'fi fi-pl';
  englishLanguage = 'fi fi-us';
  userLogged: User;
  userSubscription: Subscription;
  spinnerSubscription: Subscription;
  profileOptions: MenuItem[] = [{
    label: 'Profil',
    items: [
      {label: 'Ustawienia', routerLink: 'profile-settings'},
      {label: 'Wyloguj się', routerLink: 'logout'}
    ]
  }];

  constructor(private userService: UserService, private themeService: ThemeService, private languageService: LanguageService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.setLanguage();
    this.startSubscriptions();
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserLogged().subscribe({
        next: (response) => {
          this.userService.setUserLogged(response);
          if (response) {
            this.languageService.setUserLanguage(response.language);
          }
        }
      });
    }
    this.setStartTheme();
  }

  startSubscriptions() {
    this.userSubscription = this.userService.userLogged.subscribe({
      next: (response) => {
        this.userLogged = response;
      }
    });
    this.spinnerSubscription = this.spinnerService.spinnerLoading.subscribe({
      next: (response) => {
        this.spinnerLoading = response;
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.spinnerSubscription.unsubscribe();
  }

  setStartTheme() {
    this.themeService.setStartTheme();
  }

  changeTheme() {
    this.themeService.changeTheme();
  }

  setLanguage() {
    this.language = this.englishLanguage;
    this.languageService.initLanguages();
    const savedLanguage = this.languageService.getLanguage();
    if (savedLanguage) {
      this.languageService.setUserLanguage(savedLanguage);
      if (savedLanguage === 'pl') {
        this.language = this.polishLanguage;
      }
    }
  }

  changeLanguage() {
    let languageToSave = 'en';
    if (this.language === this.englishLanguage) {
      this.language = this.polishLanguage;
      languageToSave = 'pl';
    } else {
      this.language = this.englishLanguage;
    }
    this.languageService.setUserLanguage(languageToSave);
    this.languageService.saveLanguage(languageToSave);
  }

}
