import { Utils } from './../../utils/utils';
import { AppMessage } from './../../appmessage';
import { EventService } from './../../event.service';
import { WineService } from './../../wine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellar-edit',
  templateUrl: './cellar-edit.component.html',
  styleUrls: ['./cellar-edit.component.css']
})
export class CellarEditComponent implements OnInit {

  editCellarName: string

  constructor(private _wineService: WineService, private _appMessenger:EventService) { }

  ngOnInit() {
    this.editCellarName = this._wineService.cellarToEdit.cellarName
  }

  onClickSaveChanges()
  {
    this._wineService.updateCellar(this.editCellarName).first().subscribe(
      res => { 
        console.log("cellar-edit: onClickSaveChanges > res is ", res) 
        if (res) { this.close() }
        else {
          //user has to manually click the cancel button to close this component
          console.log(alert("There was an error changing the name of the cellar to " + this.editCellarName))
        }
      }
    )
  }

  onClickCancel()
  {
    console.log("cellar-edit: onClickCancel called")
    this.close()
  }

  close()
  {
    this._appMessenger.dispatchMessage(new AppMessage(
      Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_LIST_MODE
    ))
  }

}
