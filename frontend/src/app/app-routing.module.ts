import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauComponent } from './tableau/tableau.component';

const routes: Routes = [
  { path: 'listeUser', component: TableauComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
