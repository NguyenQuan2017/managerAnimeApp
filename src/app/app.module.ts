import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginModule} from './modules/login/login.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './core/guards/auth.guard';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {TokenService} from './core/services/token.service';
import {ToastModule} from 'ng6-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),

    // DashboardModule
  ],
  providers: [
      AuthGuard,
      TokenService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
