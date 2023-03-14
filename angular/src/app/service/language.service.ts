import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) {
  }

  public getMessage(key: string) {
    let responseMessage = '';
    this.translateService.get(key).subscribe({
      next: (response) => {
        responseMessage = response;
      }
    });
    return responseMessage;
  }

  public initLanguages() {
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  public setUserLanguage(language: string) {
    this.translateService.use(language);
  }

  public saveLanguage(language: string) {
    localStorage.setItem('language', language);
  }

  public getLanguage() {
    return localStorage.getItem('language');
  }

}
