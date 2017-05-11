import { LoginService } from './../../login.service';
import { User } from './../../user';
import { Response } from '@angular/http';
import { WineService } from './../../wine.service';
import { Cellar } from './../../cellar';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-cellar-new',
  templateUrl: './cellar-new.component.html',
  styleUrls: ['./cellar-new.component.css']
})
export class CellarNewComponent implements OnInit {

  //a copy of the user to add the new cellar to
  editUser:User

  newCellar: Cellar = new Cellar()

  constructor(private _wineService:WineService, private _loginService:LoginService) { }



  ngOnInit() {
    this._loginService.currentUser.subscribe(
      res => { this.editUser = res }
    )
  }

  onClickCreateCellar()
  {
    
    this._wineService.addCellar(this.newCellar).toPromise()
      .then( response => {
        if (response.errors) { console.log("cellar-new: onClickCreateNewCellar > error is ", response.errors) } 
        else {
          console.log("cellar-new: new cellar created successfully > adding cellar to user and updating user")
          //add the _id of the new cellar to the user and update the user
          this.editUser.cellars.push(response._id) //._id
          this.updateUser() 
          
        }
      })
      .catch( error => console.log("cellar-new: onClickCreateNewCellar > error is ",error) )
  }

  updateUser()
  {
    this._loginService.updateUser(this.editUser).subscribe(
      res => {
        console.log("cellar-new: updateUser > res is ", res)
        if (!res || res.errors) 
        { 
          console.log("cellar-new: updateUser > ERROR updating user") 
        }
        else {
          console.log("cellar-new: updateUser > successfully created new cellar and updated user")
        }
      }
    )
  }

  
}
