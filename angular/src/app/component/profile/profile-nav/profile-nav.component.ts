import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit {

  @Input()
  profilePhotoUrl: string;

  profileOptions: MenuItem[] = [{
    label: 'Profil',
    icon: 'pi pi-users',
    items: [
      {label: 'Wyloguj się', icon: 'pi pi-sign-out', routerLink: 'logout'}
    ]
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
