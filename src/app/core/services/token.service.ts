import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) {
    this.isTokenExpired(this.getToken());
  }

  setToken(token) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
      return localStorage.removeItem('token');
  }

  isTokenExpired(token): boolean {
      if (!token) {
          token = this.getToken();
      }
      if (!token)  {
          return true;
      }

      const date = this.getTokenExpirationDate(token);
      if (date === undefined) {
          this.router.navigate(['login']);
          return false;
      }

      return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
      const exp = this.payload(token).exp;

      if (exp === undefined)  {
          return null;
      }

      const date = new Date(0);
      date.setUTCSeconds(exp);
      return date;
  }


  payload(token) {
      const payload = token.split('.')[1];
      return this.decode(payload);
  }

  decode(payload) {
      return JSON.parse(atob(payload));
  }
}
