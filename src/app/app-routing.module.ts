import { VisualizadorDocumento } from './visualizador-documento/visualizador-documento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AñadirDocumento } from './añadir-documento';

import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';
import { RegistryComponent } from '../registry/registry.component';
import {CedulaComponent} from '../nueva-cedula/nuevacedula.component';
import { DocumentoComponent } from '../documento/documento.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu/:adr', component: MenuComponent },
  { path: 'registry', component: RegistryComponent },
  {path : 'nueva-cedula/:key/:adr', component : CedulaComponent},
  {path: 'aniadirdocumento', component : AñadirDocumento},
  {path: 'verdocumento/:adr', component : VisualizadorDocumento},
  {path: 'documento/:adr', component : DocumentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, MenuComponent, RegistryComponent ]
