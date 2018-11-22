import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ChangeFileComponent} from './change-file.component';
import {FileRoutingModule} from './file-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FileRoutingModule
    ],
    declarations: [
        ChangeFileComponent
    ],
    exports: [
        ChangeFileComponent
    ]
})
export class ChangeFileModule { }