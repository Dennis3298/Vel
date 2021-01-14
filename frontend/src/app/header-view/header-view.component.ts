import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AntwortverteilungDialogComponent } from '../antwortverteilung-dialog/antwortverteilung-dialog.component';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {

  titel: String = "Fragebogen-App"
  collapsed = true

  @Input() childMessage: Object;
  constructor(public dialog: MatDialog) {
    console.log(this.childMessage)
  }

  ngOnInit(): void {
  }

  openVerteilungDialog(){
    this.openDialog(this.childMessage)
  }

  openDialog(verteilung: Object){
    try{
      const dialogRef = this.dialog.open(AntwortverteilungDialogComponent, {
        data: {verteilung : verteilung}
      })
    }catch(e){console.log(e)}
  }

}
