import { User } from './../user';
import { WineService } from './../wine.service';
import { Cellar } from './../cellar';
import { LoginService } from './../login.service';
import { Utils } from './../utils/utils';
import { AppMessage } from './../appmessage';
import { EventService } from './../event.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //a copy of the user that can be used when user info needs to be edited.
  //such as when a cellar is deleted
  editUser:User

  @Output() logoutClickEvent = new EventEmitter()

  constructor(private _appMessenger:EventService, private _loginService:LoginService, private _wineService:WineService) { }

  ngOnInit() {
    this._loginService.currentUser.subscribe(
      res => { this.editUser = res }
    )
  }

  onClickLogout()
  {
    console.log("onClickLogout called...")
    this.logoutClickEvent.emit()
  }

  onClickAddCellar()
  {
    console.log("onClickAddCellar called")
    this._appMessenger.dispatchMessage(
      new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_NEW_MODE))
  }

  onClickEditProfile()
  {
    console.log("onClickEditProfile called")
    this._appMessenger.dispatchMessage(
      new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kEDIT_PROFILE_MODE))
  }

  onClickDelete(cellar: Cellar)
  {
    alert("Are you sure you want to delete this cellar: " + cellar.cellarName + "? \n This opertation cannot be undone!")
    console.log("dashboard: onClickDelete > deleting cellar")
    this._wineService.deleteCellar(cellar._id).toPromise()
      .then( res => {
        if (res) { 
          console.log("dashboard: onClickDelete > successfully deleted cellar")
          //now that the server has been sucessfully updated we can update 
          //the local copy of the currentUser and update the user on the 
          //server to to reflect the deletion
          let removeIndex = this.editUser.cellars.indexOf(cellar)
          this.editUser.cellars.splice(removeIndex, 1)
          this._loginService.updateUser(this.editUser)
        }
        else {
          console.log("dashboard: there was an error deleting the cellar: ", cellar._id)
        }
      })

  }

  onClickShow(cellar:Cellar)
  {
    //load the cellar data and then dispatch event to change the view
    this._wineService.getCellar(cellar._id).toPromise()
      .then( res => {
        if (res) {
          console.log("dashboard: onClickShow > successfully loaded cellar data > showing cellar-list")
          this._appMessenger.dispatchMessage(
            new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_LIST_MODE))
        }
        else { console.log("dashboard: onClickShow > there was error retrieving cellar data for cellar ", cellar._id) }
      })
  }

  onClickEdit()
  {
    console.log("dashboard: onClickEditCalled")
    this._appMessenger.dispatchMessage(
      new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_EDIT_MODE))
  }

  onClickAddNewWine()
  {
    console.log("dashboard: onClickAddNewWine")
    this._appMessenger.dispatchMessage(
      new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_ITEM_NEW_MODE)
    )
  }


}
