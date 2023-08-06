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
import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import {AreaService} from "../../services/Area/AreaService";
import {FormsModule} from "@angular/forms";
import {TablesRoutingModule} from "../general/tables-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ContratoService} from "../../services/Contrato/ContratoService";
import {ClienteService} from "../../services/Cliente/ClienteService";
import {SuministroComponent} from "./suministro/suministro.component";
import {UbicacionService} from "../../services/Ubicacion/UbicacionService";
import {SedeService} from "../../services/Sede/SedeService";
import {EstadoSedeService} from "../../services/EstadoSede/EstadoSedeService";
import {ProveedorService} from "../../services/Proveedor/ProveedorService";
import {EstadoProveedorService} from "../../services/EstadoProveedor/EstadoProveedorService";
import {OperadorService} from "../../services/Operador/OperadorService";
import {TipoSuministroService} from "../../services/TipoSuministro/TipoSuministroService";
import {EstadoSuministroService} from "../../services/EstadoSuministro/EstadoSuministroService";
import {SuministroService} from "../../services/Suministro/SuministroService";
import {HardwareService} from "../../services/Hardware/HardwareService";
import {HardwareComponent} from "./hardware/hardware.component";
import {TipoModeloService} from "../../services/TipoModelo/TipoModeloService";
import {ModeloService} from "../../services/Modelo/ModeloService";
import {ModeloSuministroService} from "../../services/ModeloSuministro/ModeloSuministroService";
import {ModeloComponent} from "./modelo/modelo.component";
import {ModeloSuministroComponent} from "./modelo-suministro/modelo.suministro.component";
import {EquipoComponent} from "./equipo/equipo.component";
import {EquipoService} from "../../services/Equipo/EquipoService";
import {EstadoEquipoService} from "../../services/EstadoEquipo/EstadoEquipoService";
import {UbicacionEquipolService} from "../../services/UbicacionEquipo/UbicacionEquipolService";
import {EstadoContractualService} from "../../services/EstadoContractual/EstadoContractualService";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    EquiposRoutingModule,
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
    EquiposComponent,
    SuministroComponent,
    HardwareComponent,
    ModeloComponent,
    ModeloSuministroComponent,
    EquipoComponent
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
    TipoSuministroService,
    EstadoSuministroService,
    SuministroService,
    HardwareService,
    TipoModeloService,
    ModeloService,
    ModeloSuministroService,
    EquipoService,
    EstadoEquipoService,
    UbicacionEquipolService,
    EstadoContractualService
  ]
})
export class EquiposModule { }
