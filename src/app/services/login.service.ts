import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:3000';
  validateLoginUrl = `${this.baseUrl}/validate-log-in`;
  isLoggedIn = signal(false);

  constructor(private http: HttpClient) { }

  validateLogIn(loginInfo: User){
    return this.http.post<User>(this.validateLoginUrl, loginInfo, {
      observe: 'events'
    });
  }
}
