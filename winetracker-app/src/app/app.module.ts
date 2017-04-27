import { LoginService } from './main/login.service';
import { WineService } from './main/wine.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieModule, CookieService, CookieOptions } from 'ngx-cookie'
import { COOKIE_OPTIONS, CookieOptionsProvider } from 'ngx-cookie/src/cookie-options-provider';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { CellarViewComponent } from './main/cellar-view/cellar-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    CellarViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    CookieModule.forRoot()
  ],
  providers: [WineService, LoginService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
