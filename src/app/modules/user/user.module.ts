import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './components/user.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        SharedModule,
    ],
    declarations: [
        UserComponent,
    ],
    exports: [
        UserComponent
    ]
})
export class UserModule { }