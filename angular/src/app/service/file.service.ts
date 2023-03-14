import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {APP_BASE_URL} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  FILE_URL = APP_BASE_URL + '/api/files';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  public getPhoto(file: any) {
    if (file) {
      const image = 'data:image/jpeg;base64,' + file;
      return this.sanitizer.bypassSecurityTrustResourceUrl(image);
    }
    return '';
  }

  public getVideo(file: any) {
    if (file) {
      const image = 'data:video/mp4;base64,' + file;
      return this.sanitizer.bypassSecurityTrustResourceUrl(image);
    }
    return '';
  }

  public saveFile(photoUrl: string, file: any): Observable<any> {
    let formData = new FormData();
    formData.set('fileName', photoUrl);
    formData.set('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.FILE_URL, formData, {headers: headers});
  }

}
