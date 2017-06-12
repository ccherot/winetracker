import { Utils } from './../../utils/utils';
import { AppMessage } from './../../appmessage';
import { User } from './../../user';
import { EventService } from './../../event.service';
import { LoginService } from './../../login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editUser:User = new User()
  newCredentials = new Object()

  constructor(private _loginService:LoginService, private _appMessenger:EventService) { }

  ngOnInit() {
    this._loginService.currentUser.subscribe(
      res => {
        console.log("profile-edit: ngOnInit > res is ", res)
        this.editUser = res
        this.newCredentials["_id"] = res._id
      }
    )

    this.newCredentials["oldPassword"] = ""
    this.newCredentials["newPassword"] = ""
    this.newCredentials["passwordConfirm"] = ""
    
  }

  onClickUpdate()
  {
    console.log("profile-edit: onClickUpdate")
    this._loginService.updateUser(this.editUser)
  }

  onClickChangePassword()
  {
    console.log("profile-edit: onClickChangePassword")

    this._loginService.changePassword(this.newCredentials).subscribe(
      res => {
        console.log("profile-edit: onClickChangePassword > res is ", res)
        if (res.errors || !res) { console.log("profile-edit: onClickChangePassword > error changing password")}
        else
        {
          //if we successfully changed the password 
          //then chnage the cellar view to default
          //whichever that is
          this._appMessenger.dispatchMessage(new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, 
            Utils.kCELLAR_LIST_MODE))
        }
      }
    )

  }

}
