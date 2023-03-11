import {NgModule} from "@angular/core";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faArrowDown, faArrowUp, faGear, faMeteor, faMoon, faSignOut} from "@fortawesome/free-solid-svg-icons";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
  ],
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faMoon, faSignOut, faGear, faMeteor, faArrowUp, faArrowDown);
  }
}
