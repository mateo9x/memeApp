import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {User} from "../../../model/user";
import {FileService} from "../../../service/file.service";

@Component({
  selector: 'profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {

  @Input()
  user: User;
  expanded = false;

  constructor(private eRef: ElementRef, private fileService: FileService) {
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  getIcon() {
    return this.fileService.getPhoto(this.user.iconFile);
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expanded = false;
    }
  }
}
