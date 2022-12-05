import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { RechercheComponent } from './component/recherche/recherche.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { PageAdminComponent } from './component/page-admin/page-admin.component';
import { PageUserComponent } from './component/page-user/page-user.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { ModifierComponent } from './component/modifier/modifier.component';
import { TableauComponent } from './component/tableau/tableau.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';



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
    ModifierComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
