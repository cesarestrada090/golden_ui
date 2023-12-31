import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },

  {
    title: 'General',
    icon: 'grid-outline',
    children: [
      {
        title: 'Tipo Suministro',
        link: '/pages/general/tipo-suministro',
      },
      {
        title: 'Estado Suministro',
        link: '/pages/general/estado-suministro',
      },
      {
        title: 'Tipo Modelo',
        link: '/pages/general/tipo-modelo',
      },
      {
        title: 'Estado Equipo',
        link: '/pages/general/estado-equipo',
      },
      {
        title: 'Estado Caso Técnico',
        link: '/pages/general/estado-caso',
      },
      {
        title: 'Estado Visita Técnica',
        link: '/pages/general/estado-visita',
      },
      {
        title: 'Estado Proveedor Servicio',
        link: '/pages/general/estado-proveedor',
      },
      {
        title: 'Estado Sede',
        link: '/pages/general/estado-sede',
      },
      {
        title: 'Ubicación Equipo',
        link: '/pages/general/ubicacion-equipo',
      },
      {
        title: 'Estado Detalle Visita',
        link: '/pages/general/estado-detalle',
      },
      {
        title: 'Estado Contractual',
        link: '/pages/general/estado-contractual',
      }
    ],
  },
  {
    title: 'Configuración',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Área',
        link: '/pages/configuracion/area',
      },{
        title: 'Sedes',
        link: '/pages/configuracion/sede',
      },{
        title: 'Areas y Sedes',
        link: '/pages/configuracion/areaSede',
      },{
        title: 'Contrato',
        link: '/pages/configuracion/contrato',
      },{
        title: 'Clientes',
        link: '/pages/configuracion/suministro',
      },{
        title: 'Ubicación',
        link: '/pages/configuracion/ubicacion',
      },{
        title: 'Proveedor',
        link: '/pages/configuracion/proveedor',
      },{
        title: 'Operador',
        link: '/pages/configuracion/operador',
      }
    ],
  },{
    title: 'Equipos',
    icon: 'printer-outline',
    children: [
      {
        title: 'Suministro',
        link: '/pages/equipos/suministro',
      },
      {
        title: 'Hardware',
        link: '/pages/equipos/hardware',
      },
      {
        title: 'Modelos',
        link: '/pages/equipos/modelo',
      },
      {
        title: 'Modelos Por Suministro',
        link: '/pages/equipos/modeloSuministro',
      },
      {
        title: 'Equipos',
        link: '/pages/equipos/equipo',
      }
    ],
  },{
    title: 'Casos Técnicos',
    icon: 'alert-triangle-outline',
    children: [
      {
        title: 'Técnicos',
        link: '/pages/casos/tecnico',
      },
      {
        title: 'Caso Tecnico',
        link: '/pages/casos/caso',
      },
      {
        title: 'Visitas Técnicas',
        link: '/pages/casos/visita-tecnica',
      }
    ],
  }
];
