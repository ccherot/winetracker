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



  @Output() logoutClickEvent = new EventEmitter()

  constructor(private _appMessenger:EventService, private _loginService:LoginService) { }

  ngOnInit() {
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


}
