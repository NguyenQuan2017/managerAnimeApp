import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private router: Router, private token: TokenService
              ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }
  verifyLogin (url): boolean {
      if (!this.isLoggedIn() || this.token.isTokenExpired(this.token.getToken())) {
          this.token.removeToken();
          localStorage.removeItem('isLoggedIn');
          this.router.navigateByUrl('login');
          return false;
      } else if (this.isLoggedIn() && !this.token.isTokenExpired(this.token.getToken())) {
          return true;
      }
  }

   isLoggedIn(): boolean {
      let status = false;
      if (localStorage.getItem('isLoggedIn') === 'true') {
          status = true;
      } else {
          status = false;
      }
      return status;
  }
}
