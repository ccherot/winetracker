import { Observable } from 'rxjs/Observable';
import { AppMessage } from './appmessage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  //create a private beavior subject and a public observable for 
  //components to subscribe to so they can detect when events are broadcast
  private _appMessage: BehaviorSubject<AppMessage> = new BehaviorSubject<AppMessage>(new AppMessage())
  public readonly appMessage:Observable<AppMessage> = this._appMessage 

  constructor() { }

  //set a new value for the _appMessage Observable
  dispatchMessage(messageObj:AppMessage)
  {
    console.log("event.service: dispatchMessage > ", messageObj)
    this._appMessage.next(messageObj)
  }

}
