import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../modules/dashboard/dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  data = [];
  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
    this.dashBoardService.getCountData().subscribe(data => {
      this.data = data.data;
    });
  }

}
