import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Meme, MemePageable} from "../model/meme";
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

  public getApprovedMemes(pageSelected?: number): Observable<MemePageable> {
    const params = pageSelected ? this.prepareParams(pageSelected) : null;
    return this.http.get<MemePageable>(`${this.MEME_URL}/approved?${params}`);
  }

  public getPendingMemes(pageSelected?: number): Observable<MemePageable> {
    const params = pageSelected ? this.prepareParams(pageSelected) : null;
    return this.http.get<MemePageable>(`${this.MEME_URL}/pending?${params}`);
  }

  public getMemesForUser(userId: number, pageSelected?: number): Observable<MemePageable> {
    const params = pageSelected ? this.prepareParams(pageSelected) : null;
    return this.http.get<MemePageable>(`${this.MEME_URL}/user/${userId}?${params}`);
  }

  public getMemesByTag(tag: string, pageSelected?: number): Observable<MemePageable> {
    const params = pageSelected ? this.prepareParams(pageSelected) : null;
    return this.http.get<MemePageable>(`${this.MEME_URL}/tag/${tag}?${params}`);
  }

  public updateMeme(meme: Meme): Observable<Meme> {
    return this.http.put<Meme>(`${this.MEME_URL}`, meme);
  }

  public createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>(`${this.MEME_URL}`, meme);
  }

  private prepareParams(pageSelected: number) {
    return new HttpParams().set('page', pageSelected - 1);
  }

}
