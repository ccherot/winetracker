import { User } from './user';
import { CookieService } from 'ngx-cookie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isLoggedIn: Boolean = false
  userKey: string = "loggedInUser"
  cookieStringKey = ""
  cookieString: string = ""

  currentUser:User

  constructor(private _cookieService: CookieService) { }

  ngOnInit() {
    this.currentUser = this.getCookieUser(this.userKey) as User
    this.cookieString = this.getCookie(this.userKey)
    console.log("main.component: ngOnInit: currentUser is ", this.currentUser)
    console.log("maon.component: ngOnInit: cookieString is ",  this.cookieString)
    if ( this.currentUser )
    {
      this.isLoggedIn = true;
    }
     
  }

  getCookie(key:string)
  {
    return this._cookieService.get(key)
  }

  getCookieUser(key: string){
    return this._cookieService.getObject(this.userKey);
  }

  onLogoutClickEvent()
  {
    console.log("main.component: onLoggedOut called")
    
    //since we have server connectivity, we can actually delete the local user
    //but not the cookie...we want to test if the user 
    this.currentUser = null
    this.isLoggedIn = false
    this._cookieService.remove(this.userKey)
    //this._cookieService.
  }

  onLoggedIn(user:User)
  {
    console.log("main-component: onLoggedInCalled > this.currentUser is ", this.currentUser)
    this.currentUser = user
    this.isLoggedIn = true;
    this._cookieService.putObject(this.userKey, this.currentUser)
  }

}
