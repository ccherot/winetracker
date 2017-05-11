import { WineService } from './../../wine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellar-edit',
  templateUrl: './cellar-edit.component.html',
  styleUrls: ['./cellar-edit.component.css']
})
export class CellarEditComponent implements OnInit {

  editCellarName: string

  constructor(private _wineService: WineService) { }

  ngOnInit() {
    this.editCellarName = this._wineService.cellarToEdit.cellarName
  }

  onClickSaveChanges()
  {
    this._wineService.updateCellar(this.editCellarName)    
  }

}
