import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLs} from '../url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<any>(URLs.USER_DASHBOARD);
  }
}
