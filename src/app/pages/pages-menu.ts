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
        link: '/pages/tables/tipo-suministro',
      },
      {
        title: 'Estado Suministro',
        link: '/pages/tables/estado-suministro',
      },
      {
        title: 'Tipo Modelo',
        link: '/pages/tables/tipo-modelo',
      },
      {
        title: 'Estado Equipo',
        link: '/pages/tables/estado-equipo',
      },
      {
        title: 'Estado Caso Técnico',
        link: '/pages/tables/estado-caso',
      },
      {
        title: 'Estado Proveedor Servicio',
        link: '/pages/tables/estado-proveedor',
      },
      {
        title: 'Estado Sede',
        link: '/pages/tables/estado-sede',
      },
      {
        title: 'Estado Detalle Visita',
        link: '/pages/tables/estado-detalle',
      }
    ],
  },
  {
    title: 'Configuración',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: 'Estado Detalle Visita',
        link: '/pages/tables/estado-detalle',
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
