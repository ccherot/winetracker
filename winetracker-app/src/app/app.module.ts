import { EventService } from './main/event.service';
import { BackendService } from './main/backend.service';
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
import { CellaritemNewComponent } from './main/cellar-view/cellaritem-new/cellaritem-new.component';
import { TopnavComponent } from './main/topnav/topnav.component';
import { CellarNewComponent } from './main/cellar-view/cellar-new/cellar-new.component';
import { CellarEditComponent } from './main/cellar-view/cellar-edit/cellar-edit.component';
import { CellaritemEditComponent } from './main/cellar-view/cellaritem-edit/cellaritem-edit.component';
import { ProfileEditComponent } from './main/cellar-view/profile-edit/profile-edit.component';
import { CellarListComponent } from './main/cellar-view/cellar-list/cellar-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    CellarViewComponent,
    CellaritemNewComponent,
    TopnavComponent,
    CellarNewComponent,
    CellarEditComponent,
    CellaritemEditComponent,
    ProfileEditComponent,
    CellarListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    CookieModule.forRoot()
  ],
  providers: [WineService, LoginService, CookieService, BackendService, EventService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
