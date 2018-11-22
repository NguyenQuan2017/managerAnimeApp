import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {IndexComponent} from './index.component';
import {DashboardComponent} from './dashboard/components/dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'users',
                loadChildren: './user/user.module#UserModule',
            },
            {
                path: 'categories',
                loadChildren: './category/category.module#CategoryModule'
            },
            {
                path: 'genres',
                loadChildren: './genres/genres.module#GenresModule'
            },
            {
                path: 'manga',
                loadChildren: './manga/manga.module#MangaModule'
            },
            {
                path: 'chapter',
                loadChildren: './chapter/chapter.module#ChapterModule'
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndexRoutingModule { }
