import { LoginService } from './../../login.service';
import { WineService } from './../../wine.service';
import { CellarItem } from './../../cellaritem';
import { Cellar} from './../../cellar'
import { Wine } from './../../wine';
import { User } from './../../user';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cellaritem-new',
  templateUrl: './cellaritem-new.component.html',
  styleUrls: ['./cellaritem-new.component.css']
})
export class CellaritemNewComponent implements OnInit {

  //@Input() currentUser: User

  //this is the new wine being entered in
  newWine: Wine = new Wine()
  //this is the new Cellaritem being created with this wine 
  newCellarItem = new CellarItem()
  //this is the cellar that this wine is going into
  cellar: Cellar //= this._loginService.currentUser.value().cellars[0]
  cellars: Array<Cellar>

  constructor(private _wineService: WineService, private _loginService:LoginService) { }

  ngOnInit() {
    //subscribe to the _loginService.currentUser observable here 
    //in order to get the list of available cellars to add wine to
    this._loginService.currentUser.subscribe(
      res => this.cellars = res.cellars
    )
  }

  //this adds the new wine to the database and 
  //then calls addCellarItem
  onClickAddWine(formData)
  {
    console.log("onClickAddWine called > formData is ", formData)
    //add the new wine first and then if it is successfully added
    //add a new CellarItem containing that wine
    this._wineService.addWine(this.newWine).toPromise()
      .then( response => {
        if ( response.errors ) { console.log("There was an error adding the new wine") }
        else {
          console.log("onClickAddWine: added ", response)
          console.log("onClickAddWine: now adding new cellar item")
          this.addCellarItem( response._id)
        } 
      })
  }

  addCellarItem(wineId: string)
  {
    //add the new wine to the cellarItem
    this.newCellarItem.wine = wineId;

    //now we call the _wineService to add the new CellarItem to the cellar
    this._wineService.addToCellar(this.cellar._id, wineId).toPromise()
      .then( response => {
        //TODO: check for errors - hot to update local list of cellar items???
      })
  }

}
