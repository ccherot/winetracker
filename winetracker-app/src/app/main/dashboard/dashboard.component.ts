import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() currentUser

  @Output() logoutClickEvent = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onClickLogout()
  {
    console.log("onClickLogout called...")
    this.logoutClickEvent.emit()
  }


}
