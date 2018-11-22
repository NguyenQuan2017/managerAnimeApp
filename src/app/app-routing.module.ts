import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './modules/login/components/login.component';
import {AuthGuard} from './core/guards/auth.guard';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'dashboard',
      loadChildren: './modules/index.module#IndexModule',
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
