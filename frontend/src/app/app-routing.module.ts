import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';
import { HeaderComponent } from './components/header/header.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ModifierComponent } from './components/modifier/modifier.component';
import { TableauComponent } from './components/tableau/tableau.component';
import { AuthGuard } from "./service/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: ConnectionComponent },
  { path: 'sign-up', component: InscriptionComponent },
  { path: 'modif/:id', component: ModifierComponent },
  { path: 'Users', component: TableauComponent },
  { path: 'user-profile/:id', component: HeaderComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
