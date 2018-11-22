import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../http/api.service';
import {map} from 'rxjs/internal/operators';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private token: TokenService,
              public router: Router) { }

  login(user): Observable<any> {
    const url = this.apiService.apiUrl + 'login';
    return this.http.post(url, user, this.apiService.httpOptions ).pipe(
        map(data => {
          if (data) {
           const token = data['data'].token;
           this.token.setToken(token);
           localStorage.setItem('isLoggedIn', 'true');
          }
        })
    );
  }

  getMe(): Observable<any> {
      const url = this.apiService.apiUrl + 'me';
      return this.http.get(url, this.apiService.httpOptions);
  }


  logout() {
      this.token.removeToken();
      localStorage.removeItem('isLoggedIn');
      this.router.navigateByUrl('login');
  }
}
