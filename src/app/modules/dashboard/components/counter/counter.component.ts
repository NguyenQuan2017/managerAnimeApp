import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  data = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getCountData();
  }

  getCountData(): any {
      this.dashboardService.getCountData().subscribe((data) => {
        this.data = data.data;
      });
  }
}
