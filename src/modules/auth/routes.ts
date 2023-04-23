export default [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./Main.vue'),
    children: [
      {
        path: '/auth',
        component: () => import('./pages/Index.vue'),
        name: 'auth',
      },
    ],
  },
];
