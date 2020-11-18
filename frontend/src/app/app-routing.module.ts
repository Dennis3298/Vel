import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FragebogenComponent } from './fragebogen/fragebogen.component';
import { MenuComponent } from './menu/menu.component';
import {HeuristikComponent} from './heuristik/heuristik.component';

const routes: Routes = [
  {path: '' , component: MenuComponent},
  {path: 'frageboegen', component: FragebogenComponent},
  {path: 'frageboegen/:id', component: HeuristikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
