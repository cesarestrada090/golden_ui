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
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AreaComponent} from "./area/area.component";
import {AreaService} from "../../services/Area/AreaService";
import {FormsModule} from "@angular/forms";
import {TablesRoutingModule} from "../general/tables-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ContratoComponent} from "./contrato/contrato.component";
import {ContratoService} from "../../services/Contrato/ContratoService";
import {ClienteService} from "../../services/Cliente/ClienteService";
import {ClienteComponent} from "./cliente/cliente.component";
import {UbicacionComponent} from "./ubicacion/ubicacion.component";
import {UbicacionService} from "../../services/Ubicacion/UbicacionService";
import {SedeComponent} from "./sede/sede.component";
import {SedeService} from "../../services/Sede/SedeService";
import {EstadoSedeService} from "../../services/EstadoSede/EstadoSedeService";
import {ProveedorService} from "../../services/Proveedor/ProveedorService";
import {EstadoProveedorService} from "../../services/EstadoProveedor/EstadoProveedorService";
import {ProveedorComponent} from "./proveedor/proveedor.component";
import {OperadorComponent} from "./operador/operador.component";
import {OperadorService} from "../../services/Operador/OperadorService";
import {AreaSedeComponent} from "./area-sede/area.sede.component";
import {AreaSedeService} from "../../services/AreaSede/AreaSedeService";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    ConfiguracionRoutingModule,
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
    ConfiguracionComponent,
    NotFoundComponent,
    AreaComponent,
    ContratoComponent,
    ClienteComponent,
    UbicacionComponent,
    SedeComponent,
    ProveedorComponent,
    OperadorComponent,
    AreaSedeComponent
  ],
  providers: [
    AreaService,
    ContratoService,
    ClienteService,
    UbicacionService,
    SedeService,
    EstadoSedeService,
    ProveedorService,
    EstadoProveedorService,
    OperadorService,
    AreaService,
    AreaSedeService
  ]
})
export class ConfiguracionModule { }
