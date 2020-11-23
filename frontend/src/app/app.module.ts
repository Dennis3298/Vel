import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { FooterViewComponent } from './footer-view/footer-view.component';
import { FragebogenComponent } from './fragebogen/fragebogen.component';
import { HeuristikComponent } from './heuristik/heuristik.component';
import { AuswertungComponent } from './auswertung/auswertung.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderViewComponent,
    FooterViewComponent,
    FragebogenComponent,
    HeuristikComponent,
    AuswertungComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
