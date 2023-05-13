export default [
  {
    path: '/',
    component: () => import('./Main.vue'),
    children: [
      {
        name: 'auth',
        path: '/adm/auth',
        component: () => import('./pages/Index.vue'),
      },
    ],
  },
];
