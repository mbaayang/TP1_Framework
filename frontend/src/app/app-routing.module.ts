import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { PageArchiveComponent } from './components/page-archive/page-archive.component';
import { AuthGuard } from "./service/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: ConnectionComponent },
  { path: 'sign-up', component: InscriptionComponent },
  { path: 'archives', component: PageArchiveComponent },
  /* { path: 'user-profile/:id', component: PageUserComponent, canActivate: [AuthGuard]}, */
  { path: 'user-profile/:id', component: PageAdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
