import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { CellarItem } from './../cellaritem';
import { Cellar } from './../Cellar' 
import { Utils } from './../utils/utils';
import { AppMessage } from './../appmessage';
import { EventService } from './../event.service';
import { User } from './../user';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-cellar-view',
  templateUrl: './cellar-view.component.html',
  styleUrls: ['./cellar-view.component.css']
})
export class CellarViewComponent implements OnInit {

  //TODO: ANOTHER POSSIBLE APPROACH IS TO BIND COMPONENT VISIBILITY
  //DIRECTLY TO A BOOLEAN IN THE EVENTSERVICE BUT THAT DOES
  //NOT SEEM LIKE A GOOD IDEA FOR SOME REASON.  IS ONE APPROACH
  //MORE "REACTIVE" THAN THE OTHER?  RESEARCH CONTINUES...

  //these are UI "modes" for the CellarView subcomponents
  //the ngSwitch statement in the HTML shows/hides the 
  //components based on which mode the UI is in
  cellarViewMode: string
  utils = Utils


  cellarItem:CellarItem
  cellar:Cellar

  appMessage: Subscription


  constructor(private _appMessenger:EventService) { }

  ngOnInit() {
    this.appMessage = this._appMessenger.appMessage.subscribe(
      res => {
        //if the event concerns this compoent's view mode then set it
        console.log("cellar-view: ngOnInit > subscribed to _appMessenger.appMessage > res is ", res)
        if (res.name == Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT)
        {          
          this.cellarViewMode = res.value
        }
      })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.appMessage.unsubscribe()
  }   
}
