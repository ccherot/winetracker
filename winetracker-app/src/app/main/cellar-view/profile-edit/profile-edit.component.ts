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
  constructor(private _loginService:LoginService, private _appMessenger:EventService) { }

  ngOnInit() {
    this._loginService.currentUser.subscribe(
      res => {
        console.log("profile-edit: ngOnInit > res is ", res)
        this.editUser = res
      }
    )
  }

  onClickUpdate()
  {
    console.log("edit-profile: onClickUpdate")
    this._loginService.updateUser(this.editUser)
  }

}
