import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {SharedModule} from '../shared/shared.module';
import {UserModule} from './user/user.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        IndexRoutingModule,
        DashboardModule,
        UserModule
    ],
    declarations: [
        IndexComponent,
    ],
    exports: [
        IndexComponent
    ]
})
export class IndexModule { }