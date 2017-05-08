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

  /*
  cellarEditVisible:boolean = false
  cellarNewVisible:boolean = false
  cellarItemEditVisible:boolean = false
  cellarItemNewVisible:boolean = false
  editProfileVisible:boolean = false
  */

  constructor(private _appMessenger:EventService) { }

  ngOnInit() {
    this._appMessenger.appMessage.subscribe(
      res => {
        //if the event concerns this compoent's view mode then set it
        console.log("cellar-view: ngOnInit > subscribed to _appMessenger.appMessage > res is ", res)
        if (res.name == Utils.kCELLAR_VIEW_MODE_CHANGE_EVENT)
        {
          this.cellarViewMode = res.value
        }
      })
  }

  //below is a lot of code I don't think I need any more

  //toggle component visbility based on message name / value
  /*
  onAppMessage(appMessage:AppMessage)
  {
    console.log("cellar-view: onAppMessage > appMessage name is ", appMessage.name)
    if (appMessage.value) { console.log("cellar-view: onAppMessage > appMessage value is ", appMessage.value) }

    switch (appMessage.name)
    {
      case Utils.kAPP_MESSAGE_EDIT_CELLAR_EVENT :
        this.cellarViewMode = appMessage.value;
        break
      case Utils.kAPP_MESSAGE_NEW_CELLAR_EVENT :
        this.cellarViewMode = appMessage.value;
        break
      case Utils.kAPP_MESSAGE_EDIT_PROFILE_EVENT :
        this.cellarViewMode = appMessage.value;
        break
      case Utils.kAPP_MESSAGE_NEW_CELLAR_ITEM_EVENT :
        this.cellarViewMode = appMessage.value;
        break
      case Utils.kAPP_MESSAGE_EDIT_CELLAR_ITEM_EVENT :
        this.cellarViewMode = appMessage.value
        break
    }
  }
  */

}
