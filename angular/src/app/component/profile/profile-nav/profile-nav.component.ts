import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {User} from "../../../model/user";

@Component({
  selector: 'profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {

  @Input()
  user: User;

  defaultPhotoUrl = '/assets/profile-not-found.png';
  expanded = false;

  constructor(private eRef: ElementRef) {
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expanded = false;
    }
  }
}
