import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Meme} from "../model/meme";
import {Observable} from "rxjs";
import {APP_BASE_URL} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  MEME_URL = APP_BASE_URL + '/api/memes';

  constructor(private http: HttpClient) {
  }

  public getApprovedMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.MEME_URL}/approved`);
  }

  public getPendingMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.MEME_URL}/pending`);
  }

}
