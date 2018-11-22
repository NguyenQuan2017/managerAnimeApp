import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'app-list-user-dashboard',
  templateUrl: './list-user-dashboard.component.html',
  styleUrls: ['./list-user-dashboard.component.scss']
})
export class ListUserDashboardComponent implements OnInit {
  avatar = 'assets/imgs/img_avatar.png';
  users: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getUserLatest();
  }

  getUserLatest(): any {
    return this.dashboardService.getUserLatest().subscribe(data => {
      this.users = data.data;
    });
  }

}
