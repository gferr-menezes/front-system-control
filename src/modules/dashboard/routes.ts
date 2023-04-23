export default [
  {
    path: '/',
    component: () => import('./Main.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./pages/Index.vue'),
      },
    ],
  },
];
