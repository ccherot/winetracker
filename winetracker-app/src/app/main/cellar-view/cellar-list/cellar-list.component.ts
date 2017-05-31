import { Utils } from './../../utils/utils';
import { AppMessage } from './../../appmessage';
import { EventService } from './../../event.service';
import { CellarItem } from './../../cellaritem';
import { WineService } from './../../wine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellar-list',
  templateUrl: './cellar-list.component.html',
  styleUrls: ['./cellar-list.component.css']
})
export class CellarListComponent implements OnInit {

  

  constructor(private _wineService:WineService, private _appMessenger:EventService) { }

  ngOnInit() {

  }

  //handler for when a cellar item's edit button is clicked 
  onClickEdit(cellarItem:CellarItem)
  {
    //set the cellarToEdit property in the WineService
    this._wineService.cellarItemToEdit = cellarItem
    
    //use the event service to change the view to the 
    //cellar item edit view
    this._appMessenger.dispatchMessage(new AppMessage(Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT, Utils.kCELLAR_ITEM_EDIT_MODE))
  }
  

  onClickDelete()
  {
    alert("Coming soon!  'Deleting a wine will actually just move it to a list of cellar items with a quantity of 0. From that list you may completely delete the cellar item if it is definitely not wanted.")
  }

}
