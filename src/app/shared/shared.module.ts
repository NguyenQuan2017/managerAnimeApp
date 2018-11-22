import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import {FileSelectDirective} from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        UploadFormComponent,
        FileSelectDirective,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        UploadFormComponent,
    ]

})
export class SharedModule { }