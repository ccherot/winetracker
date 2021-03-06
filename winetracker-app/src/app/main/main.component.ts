import { LoginService } from './login.service';
import { User } from './user';
import { CookieService } from 'ngx-cookie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _loginService:LoginService) { }

  ngOnInit() {

    //see if there is a logged in user
    console.log("main: ngOnInit: calling this._loginService.getUser()")
    this._loginService.getUser()
    this._loginService.isLoggedIn.subscribe(
      res => { console.log( "main: ngOnInit > subscribed to _loginService.isLoggedIn > res is ", res)}
    )
  }

  onLogoutClickEvent()
  {
    console.log("main.component: onLoggedOut called")
    this._loginService.logout()
  }

  
}
