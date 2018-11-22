import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MangaComponent} from './components/manga.component';
const routes: Routes = [
    {
        path: '',
        component: MangaComponent
    },
    {
        path: ':manga_id/image/:file_id',
        loadChildren: '../change-file/changeFile.module#ChangeFileModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MangaRoutingModule { }
