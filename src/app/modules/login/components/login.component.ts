import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../../core/services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: '../pages/login.component.html',
  styleUrls: ['../pages/login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {};
  returnUrl: string;

  constructor(private auth: AuthenticateService,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenService
              ) {}


  ngOnInit() {
      if (!this.token.isTokenExpired(this.token.getToken())) {
          this.router.navigate(['dashboard']);
      }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }
  login(user): any {
    this.auth.login(user).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    },
    error => {
      console.log(error);
    });
  }
}
