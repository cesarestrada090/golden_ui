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
        title: 'Estado Proveedor Servicio',
        link: '/pages/general/estado-proveedor',
      },
      {
        title: 'Estado Sede',
        link: '/pages/general/estado-sede',
      },
      {
        title: 'Estado Detalle Visita',
        link: '/pages/general/estado-detalle',
      }
    ],
  },
  {
    title: 'Configuración',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: 'Área',
        link: '/pages/configuracion/area',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
