import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APP_BASE_URL} from "../app.service";
import {MemeComment} from "../model/meme-comment";

@Injectable({
  providedIn: 'root'
})
export class MemeCommentService {

  MEME_COMMENT_URL = APP_BASE_URL + '/api/meme-comments';

  constructor(private http: HttpClient) {
  }

  public getMemeCommentsByMemeId(memeId: number): Observable<MemeComment[]> {
    return this.http.get<MemeComment[]>(`${this.MEME_COMMENT_URL}/meme/${memeId}`);
  }

  public updateMemeComment(memeComment: MemeComment): Observable<MemeComment> {
    return this.http.put<MemeComment>(`${this.MEME_COMMENT_URL}`, memeComment);
  }

  public createMemeComment(memeComment: MemeComment): Observable<MemeComment> {
    return this.http.post<MemeComment>(`${this.MEME_COMMENT_URL}`, memeComment);
  }

}
