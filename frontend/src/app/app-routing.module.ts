import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauComponent } from './component/tableau/tableau.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { PageAdminComponent } from './component/page-admin/page-admin.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'Users', component: TableauComponent },
  { path: 'inscriptionUser', component: InscriptionComponent },
  { path: 'pageAdmin', component: PageAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }