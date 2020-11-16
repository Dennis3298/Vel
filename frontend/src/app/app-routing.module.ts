import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FragebogenComponent } from './fragebogen/fragebogen.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '' , component: MenuComponent},
  {path: 'frageboegen', component: FragebogenComponent},
  {path: 'frageboegen/:id', component: FragebogenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
