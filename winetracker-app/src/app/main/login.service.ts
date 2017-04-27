import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import 'rxjs'

@Injectable()
export class LoginService {

  constructor(private _http:Http) { }

  doLogin(userObj)
  {
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.post("/login", userObj, options)
      .map ( (response: Response) => response.json() )
  }

  doRegister(newUser) {
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.post("/register", newUser, options)
      .map ( (response: Response) => response.json() )
    
  }

}
