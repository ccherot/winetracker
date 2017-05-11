import { WineService } from './../../wine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellar-list',
  templateUrl: './cellar-list.component.html',
  styleUrls: ['./cellar-list.component.css']
})
export class CellarListComponent implements OnInit {

  constructor(private _wineService:WineService) { }

  ngOnInit() {
    
  }

}
