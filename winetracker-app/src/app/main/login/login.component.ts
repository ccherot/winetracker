import { CookieService } from 'ngx-cookie';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../user'
import { LoginService } from './../login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loginEvent = new EventEmitter()

  userEmail:string
  userPassword:string

  newUser = new User()

  //do you need the current user here? They
  //are not logged in if they are on this screen
  //@Input() currentUser: User 

  //userKey: string = "loggedInUser"

  constructor(private _loginService:LoginService) { } //, private _cookieService:CookieService

  ngOnInit() {
    
  }

  onClickLogin()
  {
    console.log("login: onClickLogin called")
    let userObj = {email: this.userEmail, password: this.userPassword}
    this._loginService.login(userObj).toPromise()
      .then( user => { 
        //if the server returned false then there was a password mismatch
        if (!user) { this.onLoginError() }
        else {
        
          console.log("login: onClickLogin > user is ", user) 
          //this.currentUser = user
          this.loginEvent.emit(user)
        }
      })
      .catch( error => {
        console.log("ERROR: login: onClickLogin > error is", error)
        this.onLoginError()
      })
  }

  onClickRegister()
  {
    console.log("login: onClickRegister called", this.newUser)
    this._loginService.register(this.newUser).toPromise()
      .then( user => { 
        if (user && user.errors) { console.log("login: onClickRegister > error is", user.errors) }
        else { console.log("login: onClickRegister > user is ", user) }
      })
      .catch( error => { console.log("login: onClickRegister > error is", error) } ) 
  }

  onLoginError()
  {
    //TODO:  CHANGE THE STYLE OF THE TEXTFIELDS TO BE RED OR 
    //PROVIDE FEEDBACK TO USER ABOUT PASSWORD OR USERNAME BEING INCORRECT
  }

}
