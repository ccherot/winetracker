import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CellarItem } from './cellaritem';
import { Wine } from './wine';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Cellar } from './cellar'


@Injectable()
export class WineService {

  //private properties for Wine, Cellar, and CellarItem instances that will be edited
  //These do not need to be Observables / BehaviorSubjects so we can just use 
  //regular getter / setter syntax 

  private _cellarToEdit:Cellar
  set cellarToEdit(val:Cellar) { this._cellarToEdit = val }
  get cellarToEdit():Cellar { return this._cellarToEdit }

  private _cellarItemToEdit:CellarItem
  set cellarItemToEdit(val:CellarItem) { this._cellarItemToEdit = val }
  get cellarItemToEdit():CellarItem { return this._cellarItemToEdit}

  private _wineToEdit:Wine
  set wineToEdit(val:Wine) { this._wineToEdit = val }
  get wineToEdit():Wine { return this._wineToEdit }

  
  constructor(private _backendService:BackendService) { }
  //
  //Wine Related
  //
  addWine(newWine:Wine)
  {
    let obs = this._backendService.doAddWine(newWine)

    obs.subscribe(
      res => {
        if (res) { console.log("wine.service: addWine > successfully added wine ", res._id) }
      }
    )

    return obs
    
  }

  //
  //CellarItem related 
  //
  addCellarItem(cellarItem:CellarItem)
  {
    let obs = this._backendService.doAddCellarItem(cellarItem)

    obs.subscribe(
      res => { console.log("wine.service: addCellaritem > res is ", res) }
    )

    return obs    
  }

  //TODO:  SHOULD CELLAR ITEMS BE DELETED WHEN THE QTY == 0 ?
  //MAYBE THEY SHOULD JUST GO TO A "CONSUMED" LIST OF CELLARITEMS
  //...ESPECIALLY IF THEY ARE GOING TO BE PURCHASED AGAIN
  //THEY COULD ALSO JUST REMAIN IN THE CELLAR WITH A QTY OF 0
  //AND FILTERED OUT OF CERTAIN DISPLAY LISTS
  deleteCellarItem()
  {

  }

  //
  //Cellar related
  //
  addCellar(newCellar)
  {
    console.log("wine.service: addCellar called.  newCellar is ", newCellar)
    
    let obs = this._backendService.doAddCellar(newCellar)

    obs.subscribe(
      res => {
        console.log("wine.service: addCellar > res is ", res)
      }
    )
    
    return obs
  }

  updateCellar(editCellarName:string)
  {
    //create observable that will be returned to the caller
    let obs = this._backendService.doUpdateCellar({_id: this._cellarToEdit._id, cellarName: editCellarName})

    obs.subscribe(
      res => {
        console.log("wine.service: updateCellar > res is ", res)
        //if it was successful then we want to update the cellar locally
        //now that the server has been updated
        if (res) { this._cellarToEdit.cellarName = editCellarName}
      }
    )
    return obs
  }

  addToCellar(cellarId, newItem)
  {
    let obs = this._backendService.doAddToCellar(cellarId, newItem)

    obs.subscribe(
      res => {console.log("wine.service: addToCellar > res is ", res)} 
    )

    return obs
  }

  //
  //Tasting Notes
  //
}
