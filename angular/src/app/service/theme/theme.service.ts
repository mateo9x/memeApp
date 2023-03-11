import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
  }

  public setStartTheme(): void {
    this.isDarkMode() ? this.setDarkMode() : this.setDefaultMode();
  }

  public changeTheme(): void {
    this.isDarkMode() ? this.setDefaultMode() : this.setDarkMode();
  }

  private isDarkMode(): boolean {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      return JSON.parse(darkMode);
    } else {
      return false;
    }
  }

  private setDarkMode() {
      document.documentElement.style.setProperty('--main-background-color', '#111111');
      document.documentElement.style.setProperty('--main-navbar-background-color', '#000000');
      document.documentElement.style.setProperty('--main-text-color', '#ffffff');
      document.documentElement.style.setProperty('--main-text-color-hover', '#da5413');
      localStorage.setItem('darkMode', JSON.stringify(true));
  }

  private setDefaultMode() {
    document.documentElement.style.setProperty('--main-background-color', '#ffffff');
    document.documentElement.style.setProperty('--main-navbar-background-color', '#e5e4e4');
    document.documentElement.style.setProperty('--main-text-color', '#000000');
    document.documentElement.style.setProperty('--main-text-color-hover', '#da5413');
    localStorage.setItem('darkMode', JSON.stringify(false));
  }

}
