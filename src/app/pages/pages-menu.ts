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
      }
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
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
