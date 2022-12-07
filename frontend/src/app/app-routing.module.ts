import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauComponent } from './component/tableau/tableau.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { ModifierComponent } from './component/modifier/modifier.component';
import { PageAdminComponent } from './component/page-admin/page-admin.component';
import { HeaderComponent } from './component/header/header.component';
import { PageArchiveComponent } from './component/page-archive/page-archive.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Users', component: TableauComponent },
  { path: 'login', component: ConnexionComponent },
  {path: 'inscriptionUser', component: InscriptionComponent},
  { path: 'pageAdmin', component: PageAdminComponent},
  { path: 'modif/:id', component: ModifierComponent},
  {path:'pageArchive', component: PageArchiveComponent},
  { path: 'user-profile/:id', component: HeaderComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
