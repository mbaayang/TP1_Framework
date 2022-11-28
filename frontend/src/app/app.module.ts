import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RechercheComponent } from './recherche/recherche.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { PageUserComponent } from './page-user/page-user.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ModifierComponent } from './modifier/modifier.component';
import { TableauComponent } from './tableau/tableau.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableauComponent,
    RechercheComponent,
    PaginationComponent,
    PageAdminComponent,
    PageUserComponent,
    ConnexionComponent,
    InscriptionComponent,
    ModifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
