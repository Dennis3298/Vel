import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {

  titel: String = "Fragebogen-App"
  constructor() { }

  ngOnInit(): void {
  }

}
