import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard.component';
import {CommonModule} from '@angular/common';
import { CounterComponent } from './components/counter/counter.component';
import { ListUserDashboardComponent } from './components/list-user-dashboard/list-user-dashboard.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DashboardComponent,
        CounterComponent,
        ListUserDashboardComponent
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule { }