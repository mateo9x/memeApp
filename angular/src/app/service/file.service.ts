import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  public doesFileAlreadyExists(userId: number, fileName: string): Observable<any> {
    const directoryPath = MEME_ASSETS_PATH_PREFIX + userId;
    return this.http
      .get(`${directoryPath}/${fileName}`, {observe: 'response', responseType: 'blob'});
  }

  public saveFile(userId: number, fileName: string, file: any): Observable<any> {
    const directoryPath = MEME_ASSETS_PATH_PREFIX + userId;
    let formData = new FormData();
    formData.set('image', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http
      .post(`${directoryPath}/${fileName}`, formData, {
        headers: headers
      });
  }

}

export const MEME_ASSETS_PATH_PREFIX = 'assets/memes/';
