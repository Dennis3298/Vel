import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { FooterViewComponent } from './footer-view/footer-view.component';
import { FragebogenComponent } from './fragebogen/fragebogen.component';
import { HeuristikComponent } from './heuristik/heuristik.component';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FragebogenListeComponent } from './fragebogen-liste/fragebogen-liste.component';
import { AntwortverteilungDialogComponent } from './antwortverteilung-dialog/antwortverteilung-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderViewComponent,
    FooterViewComponent,
    FragebogenComponent,
    HeuristikComponent,
    AuswertungComponent,
    DetailDialogComponent,
    FragebogenListeComponent,
    AntwortverteilungDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CommonModule
  ],
  entryComponents:[
    DetailDialogComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
