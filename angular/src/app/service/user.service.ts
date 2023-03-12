import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APP_BASE_URL} from "../app.service";
import {Observable, Subject} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USERS_URL = APP_BASE_URL + '/api/users';
  userLogged = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  public getUserLogged(): Observable<User> {
    return this.http.get<User>(`${this.USERS_URL}/user-logged`);
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.USERS_URL, user);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.USERS_URL}/username/${username}`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.USERS_URL}/email/${email}`);
  }

}
