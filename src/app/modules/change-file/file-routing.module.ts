import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangeFileComponent} from './change-file.component';
const routes: Routes = [
    {
        path: '',
        component: ChangeFileComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FileRoutingModule { }
