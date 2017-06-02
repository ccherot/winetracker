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

  doChangePassword(newCredentials)
  {
    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.post("/users/changepassword", newCredentials, options).share()
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


  //Cellar Related

  //this should get all of the CellarItems within a cellar
  doGetCellar(id:string)
  {
    console.log("backend.service: doGetcellar called")

    return this._http.get('/cellar/' + id).share()
    .map( (response:Response) => response.json() )
  }

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

  doDeleteCellar(id:String)
  {
    console.log("backend.service: doDelete cellar called")

    return this._http.delete("/cellar/" + id)
      .map( (response: Response) => response.json() )
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
    console.log("backend.service: doAddToCellar > cellarId is " + cellarId + " and newItem is ", newItem)     
    let headers = new Headers( {"Content-Type": "application/json"} )
    let reqOptions = new RequestOptions( { headers: headers } )
    let data = {cellarId: cellarId, cellarItem: newItem}
    return this._http.post("/cellaritem", JSON.stringify(data), reqOptions).share()
      .map( (response: Response ) => response.json() )

  }

  doEditCellarItem(cellarItem)
  {
    console.log("backend.service: doUpdateCellarItem > _id is ", cellarItem._id)

    const headers = new Headers({ "Content-Type": "application/json" })
  	const options = new RequestOptions({ headers: headers })
    return this._http.patch("/cellaritem", cellarItem, options).share()
      .map ( (response: Response) => response.json() )
    

  }
}
