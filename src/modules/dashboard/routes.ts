export default [
  {
    path: '/adm',
    component: () => import('./Main.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('./pages/Index.vue'),
      },
    ],
  },
];
