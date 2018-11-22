import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChapterComponent} from './components/chapter.component';
import {ChapterRoutingModule} from './chapter-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        ChapterRoutingModule,
        FormsModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxPaginationModule
    ],
    declarations: [
        ChapterComponent
    ],
    exports: [
        ChapterComponent
    ]
})
export class ChapterModule { }