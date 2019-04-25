import { CedulaComponent } from './../nueva-cedula/nuevacedula.component';
import { DocumentoComponent } from './../documento/documento.component';
import { VisualizadorDocumento } from './visualizador-documento/visualizador-documento.component';
import { MenuComponent } from './../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';
import { NameChangeComponent } from './name-change/name-change.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegistryComponent } from '../registry/registry.component';
import { AñadirDocumento } from './añadir-documento';

@NgModule({
  declarations: [
    AppComponent,
    NameChangeComponent, VisualizadorDocumento, AñadirDocumento, DocumentoComponent, CedulaComponent, routingComponents
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule, AppRoutingModule, NgbModule, MatNativeDateModule, MatDatepickerModule, 
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
