import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../pages/dashboard.component.html',
  styleUrls: ['../pages/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

}
