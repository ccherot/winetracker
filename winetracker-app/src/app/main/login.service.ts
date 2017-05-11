import { BackendService } from './backend.service';
import { CookieService } from 'ngx-cookie';
import { User } from './user';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class LoginService {

  //this service will hold the current logged in user and the backend service will 
  //handle the login and register, return an observable, and this service 
  //will then return that same observable

  private _currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User())
  public readonly currentUser: Observable<User> = this._currentUser//.asObservable()

  //the _isLoggedIn flag is an observable which can be used with the async pipe 
  //throughout the various components of the application
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public readonly isLoggedIn: Observable<boolean> = this._isLoggedIn

  //cookie is stored with this key
  userKey: string = "loggedInUser"

  constructor(private _cookieService: CookieService, private _backendService:BackendService) 
  { 
    console.log("login.service: constructor called")
  }

  //this sets the user observable value to the cookie value
  getUser()
  {
    let cookieUser = this.getCookieUser(this.userKey) as User
    console.log("getUser called and cookie user is ", cookieUser)
    if (cookieUser != null && cookieUser != undefined){
      this._currentUser.next(cookieUser)
      this._isLoggedIn.next(true)
    }
    else{
      console.log("getUser called and this._isLoggedIn is ",  this._isLoggedIn.value)
      //this._currentUser = null
      this._isLoggedIn.next(false)
    }
  }

  getCookieUser(key: string){
    console.log("login.service: getCookieUser called for key: ", key)
    return this._cookieService.getObject(this.userKey);
  }

  logout()
  {
    console.log("login.service: logout called")
    this._isLoggedIn.next(false)
    this._cookieService.remove(this.userKey)
    //set the currentUser to an empty user
    this._currentUser.next(new User())
  }

  login(userObj) 
  {
    console.log("service.service: login called ")
    console.log("login.service: login called and _isLoggedIn is ", this._isLoggedIn)
    console.log("login.service: login called and _currentUser is ", this._currentUser)
    
    //create an observable that we will return to the caller
    let obs = this._backendService.doLogin(userObj)
    
    //subscribe to login observable in the backend service 
    obs.subscribe(
      res => {
        console.log("login.service: login > res is ", res) 
        this._currentUser.next(res)
        this._cookieService.putObject(this.userKey, this._currentUser.value)
        this._isLoggedIn.next(true)
      }
    )
      
    return obs

  }

  register(newUser)
  {
    console.log("login.service: register called");
    
    console.log("login.service: register called and _isLoggedIn is ", this._isLoggedIn)
    console.log("login.service: register called and _currentUser is ", this._currentUser)
    
    let obs = this._backendService.doRegister(newUser)

    obs.subscribe(
      res => {
        console.log("login.service: register > res is ", res)
        this._currentUser.next(res)
        this._cookieService.putObject(this.userKey, this._currentUser.value)
        this._isLoggedIn.next(true)
      }
    )

    return obs
  }

  updateUser(editUser)
  {
    delete editUser.password
    delete editUser.passwordConfirm
    let obs = this._backendService.doUpdateUser(editUser)

    obs.subscribe(
      res => { 
        //TODO: CHECK FOR ERRORS?
        console.log("login-service: updateUser > res is ", res)
        this._currentUser.next(res)
        this._cookieService.putObject(this.userKey, this._currentUser.value)
      } 
    )

    return obs
  }

  
}
