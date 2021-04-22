import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDecoded } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  public user: UserDecoded;
  public token: string;
  public hasClickedOnStart = false

  public login(body) {
    return this.http.post('http://localhost:1000/auth/login', body)
  }

  public register_first(body) {
    return this.http.post('http://localhost:1000/auth/register_first', body)
  }
  public register_sec(body) {
    return this.http.post('http://localhost:1000/auth/register_sec', body)
  }

}
