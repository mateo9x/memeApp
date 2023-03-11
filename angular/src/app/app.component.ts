import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./service/user.service";
import {User} from "./model/user";
import {Subscription} from "rxjs";
import {MenuItem} from "primeng/api";
import {ThemeService} from "./service/theme/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userLogged: User;
  userSubscription: Subscription;
  profileOptions: MenuItem[] = [{
    label: 'Profil',
    items: [
      { label: 'Ustawienia', routerLink: 'profile-settings' },
      { label: 'Wyloguj się', routerLink: 'logout' }
    ]
  }];

  constructor(private userService: UserService, private themeService: ThemeService) {
  }

  ngOnInit() {
    this.startSubscriptions();
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserLogged().subscribe({
        next: (response) => {
          this.userService.userLogged.next(response);
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
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  setStartTheme() {
    this.themeService.setStartTheme();
  }

  changeTheme() {
    this.themeService.changeTheme();
  }

}
