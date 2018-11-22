import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MangaRoutingModule} from './manga-routing.module';
import {MangaComponent} from './components/manga.component';
import {SharedModule} from '../../shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

@NgModule({
    imports: [
        CommonModule,
        MangaRoutingModule,
        FormsModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [
        MangaComponent,
    ],
    exports: [
        MangaComponent
    ]
})
export class MangaModule { }