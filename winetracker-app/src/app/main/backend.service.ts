import { CellarItem } from './cellaritem';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';


@Injectable()
export class BackendService {

  constructor(private _http:Http) { }

  //User Related Backend Operations

  doLogin(userObj)
  {
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    //use the .share() method since we don't know where we are going to 
    //be calling this from potentially and we do not want to repeat 
    //HTTP calls
    return this._http.post("/login", userObj, options).share() 
      .map ( (response: Response) => response.json() )
  }

  doRegister(newUser) {
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.post("/register", newUser, options).share()
      .map ( (response: Response) => response.json() )
    
  }

  doUpdateUser(editUser)
  {
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.patch("/users", editUser, options).share()
      .map ( (response: Response) => response.json() )
    
  }


  //Wine Related

  doAddWine(newWine)
  {
    let headers = new Headers( {"Content-Type": "application/json"} )
    let reqOptions = new RequestOptions( { headers: headers } )
    return this._http.post("/wines", newWine, reqOptions).share()
      .map( (response: Response ) => response.json() )

  }


  //Cellar Realted

  doAddCellar(newCellar)
  {      
    console.log("backend.service: doAddCellar called")
    let headers = new Headers( {"Content-Type": "application/json"} )
    let reqOptions = new RequestOptions( { headers: headers } )
    return this._http.post("/cellar", newCellar, reqOptions).share()
      .map( (response: Response ) => response.json() )
  }

  doUpdateCellar(editObj)
  {
    console.log("backend.service: doUpdateCellar called")
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.patch("/cellar", editObj, options).share()
      .map ( (response: Response) => response.json() )

  }

  //
  //Cellaritem Related
  //
  doAddCellarItem(cellarItem)
  {
    let headers = new Headers( {"Content-Type": "application/json"} )
    let reqOptions = new RequestOptions( { headers: headers } )
    return this._http.post("/cellaritem", cellarItem, reqOptions).share()
      .map( (response: Response ) => response.json() )

  }

  doAddToCellar(cellarId, newItem)
  {
        
    let headers = new Headers( {"Content-Type": "application/json"} )
    let reqOptions = new RequestOptions( { headers: headers } )
    let body = {cellarId: cellarId, newItem: newItem}
    return this._http.post("/cellaritem", body, reqOptions).share()
      .map( (response: Response ) => response.json() )

  }
}
