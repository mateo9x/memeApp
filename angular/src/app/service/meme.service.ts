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

  public getMemeById(id: number): Observable<Meme> {
    return this.http.get<Meme>(`${this.MEME_URL}/${id}`);
  }

  public getRandomMeme(): Observable<Meme> {
    return this.http.get<Meme>(`${this.MEME_URL}/random`);
  }

  public getApprovedMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.MEME_URL}/approved`);
  }

  public getPendingMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.MEME_URL}/pending`);
  }

  public getMemesForUser(userId: number): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.MEME_URL}/user/${userId}`);
  }

  public getMemesByTag(tag: string): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.MEME_URL}/tag/${tag}`);
  }

  public updateMeme(meme: Meme): Observable<Meme> {
    return this.http.put<Meme>(`${this.MEME_URL}`, meme);
  }

  public createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>(`${this.MEME_URL}`, meme);
  }

}
