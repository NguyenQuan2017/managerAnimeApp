import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../../core/services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any = {
    userName: null
  };
  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
    this.getMe();
  }

  getMe(): any {
    this.auth.getMe().subscribe(data => {
     this.user = data.data;
    });
  }

  logout() {
    this.auth.logout();
  }
}
