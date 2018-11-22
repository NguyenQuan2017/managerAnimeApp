import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GenresRoutingModule} from './genres-routing.module';
import {GenresComponent} from './components/genres.component';

@NgModule({
    imports: [
        CommonModule,
        GenresRoutingModule,
        FormsModule
    ],
    declarations: [
        GenresComponent,
    ],
    exports: [
        GenresComponent
    ]
})
export class GenresModule { }