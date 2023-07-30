import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbOptionModule, NbSelectModule,
  NbTreeGridModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { CasosRoutingModule } from './casos-routing.module';
import {FormsModule} from "@angular/forms";
import {TablesRoutingModule} from "../general/tables-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ProveedorService} from "../../services/Proveedor/ProveedorService";
import {TecnicoComponent} from "./tecnico/tecnico.component";
import {CasosComponent} from "./casos.component";
import {SuministroService} from "../../services/Suministro/SuministroService";
import {TipoSuministroService} from "../../services/TipoSuministro/TipoSuministroService";
import {EstadoSuministroService} from "../../services/EstadoSuministro/EstadoSuministroService";
import {TecnicoService} from "../../services/TecnicoService/TecnicoService";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    CasosRoutingModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    NbDatepickerModule,
    NbCardModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbOptionModule,
    NbSelectModule,
  ],
  declarations: [
    CasosComponent,
    TecnicoComponent
  ],
  providers: [
    ProveedorService,
    SuministroService,
    TipoSuministroService,
    EstadoSuministroService,
    TecnicoService
  ]
})
export class CasosModule { }
