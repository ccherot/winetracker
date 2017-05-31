import { WineService } from './../../wine.service';
import { CellarItem } from './../../cellaritem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellaritem-edit',
  templateUrl: './cellaritem-edit.component.html',
  styleUrls: ['./cellaritem-edit.component.css']
})
export class CellaritemEditComponent implements OnInit {

  cellarItem:CellarItem

  constructor(private _wineService:WineService) { }

  ngOnInit() {
    this.cellarItem = this._wineService.cellarItemToEdit

    console.log("show / edit item: ", this.cellarItem)
  }

  onClickEditCellarItem(formData)
  {
    console.log("cellaritem-edit: onClickEditCellar called", this.cellarItem)

    this._wineService.updateCellarItem(this.cellarItem)

  }

}
