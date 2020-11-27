import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Output, EventEmitter} from '@angular/core';
import {FragebogenService} from '../fragebogen.service'
import Frage from '../Models/frage';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialogComponent{

  detailFragen: string[]
  heuristikTitel: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fragebogenService: FragebogenService) {
  }

  ngOnInit() {
    this.detailFragen = this.data.details.detailFragen
    this.heuristikTitel = this.data.details.heuristikTitel

    console.log(this.detailFragen)
    console.log(this.heuristikTitel)
  }

  onButtonSaveClick(notizen: any){
    let _heuristikId
    let _frageId
    let _fragebogenId
    this.fragebogenService.updateHeuristik(_heuristikId, _fragebogenId, _frageId, notizen )
  }

}
