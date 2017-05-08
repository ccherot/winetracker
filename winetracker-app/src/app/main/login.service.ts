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

  //does this need to be an observalbe?
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public readonly isLoggedIn: Observable<boolean> = this._isLoggedIn

  //cookie is stored with this key
  userKey: string = "loggedInUser"

  constructor(private _cookieService: CookieService, private _backendService:BackendService) { }

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
      this._currentUser = null
      this._isLoggedIn.next(false)
    }
  }

  getCookieUser(key: string){
    return this._cookieService.getObject(this.userKey);
  }

  logout()
  {
    this._isLoggedIn.next(false)
    this._cookieService.remove(this.userKey)
  }

  login(userObj) 
  {
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
    let obs = this._backendService.doRegister(newUser)

    obs.subscribe(
      res => {
        console.log("login.service: register > res is ", res)
        this._currentUser = res
        this._cookieService.putObject(this.userKey, this._currentUser)
      }
    )

    return obs
  }

  updateUser(editUser)
  {
    let obs = this._backendService.doUpdateUser(editUser)

    obs.subscribe(
      res => { console.log("login-service: updateUser > res is ", res)} 
    )

    return obs
  }
}
