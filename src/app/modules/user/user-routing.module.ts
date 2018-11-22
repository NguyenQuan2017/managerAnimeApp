import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './components/user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
    },
    {
        path: ':user_id/image/:file_id',
        loadChildren: '../change-file/changeFile.module#ChangeFileModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
