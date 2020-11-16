import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { FooterViewComponent } from './footer-view/footer-view.component';
import { FragebogenComponent } from './fragebogen/fragebogen.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderViewComponent,
    FooterViewComponent,
    FragebogenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
