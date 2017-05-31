import { Utils } from './../../utils/utils';
import { AppMessage } from './../../appmessage';
import { EventService } from './../../event.service';
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

  //TODO: CONSIDER USING THE NGFORM DATA SO THAT YOU DONT
  //EVEN NEED THE NEWWINE AMD NEWCELLAR PROPERTIES.  
  //WOULD MAKE THINGS EVEN CLEANER

  //this is the new wine being entered in
  newWine: Wine = new Wine()

  //this is the new Cellaritem being created with this wine 
  newCellarItem: CellarItem = new CellarItem()

  //this is the cellar that this wine is going into
  targetCellar: Cellar //= this._loginService.currentUser.value().cellars[0]
  
  //this is the list of cellars owned by the current user
  //which is used to populate the option select UI component for cellar 
  cellars: Array<Cellar>

  constructor(private _wineService: WineService, private _loginService:LoginService, private _appMessenger:EventService) { }

  ngOnInit() {
    //subscribe to the _loginService.currentUser observable here 
    //in order to get the list of available cellars to add wine to
    this._loginService.currentUser.subscribe(
      res => this.cellars = res.cellars
    )
    //subscribe to the current cellar
    /*
    this._wineService.currentCellar.subscribe(
      res => this.cellar = res
    )
    */
  }

  //this adds the new wine to the database and 
  //then calls addCellarItem
  onClickAddWine(formData)
  {
    console.log("cellar-item-new: onClickAddWine called > targetCellar is ", this.targetCellar)
    console.log("cellar-item-new: onClickAddWine called > targetCellar.cellarName is ", this.targetCellar.cellarName)
    //add the new wine first and then if it is successfully added
    //add a new CellarItem containing that wine
    this._wineService.addWine(this.newWine).toPromise()
      .then( response => {
        if ( response.errors ) { console.log("cellar-item-new: There was an error adding the new wine") }
        else {
          console.log("cellar-item-new: onClickAddWine: added ", response)
          console.log("cellar-item-new: onClickAddWine: now adding new cellar item")
          this.addCellarItem(response._id)
        } 
      })
  }

  addCellarItem(wineId: string)
  {
    console.log("cellar-item-new: addCellarItem > targetCellar is ", this.targetCellar.cellarName)
    console.log("cellar-item-new: addCellarItem > newCellarItem is ", this.newCellarItem)
    
    //add the new wine to the cellarItem
    this.newCellarItem.wine = wineId;

    //now we call the _wineService to add the new CellarItem to the cellar
    this._wineService.addToCellar(this.targetCellar._id, this.newCellarItem).toPromise()
      .then( response => {
        if (!response || response.errors)
        {
          console.log("cellar-item-new: ERROR: there was an error adding new wine to cellar")
        }
        else {
          console.log("cellar-item-new: successfully added cellarItem to cellar: ", response)
          //this view persists until the user clicks Done
        }
      })
  }

  onClickUpload()
  {
    alert("coming soon!")
  }

  onClickDone()
  {
    this._appMessenger.dispatchMessage(
      new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_LIST_MODE)
    )
  }

}
