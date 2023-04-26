export default [
  {
    path: '/',
    component: () => import('./Main.vue'),
    children: [
      {
        path: '/company',
        name: 'company',
        component: () => import('./pages/Index.vue'),
      },
      {
        path: '/company/create',
        name: 'companyCreate',
        component: () => import('./pages/CreateOrEdit.vue'),
      },
      {
        path: '/company/edit/:id',
        name: 'companyEdit',
        component: () => import('./pages/CreateOrEdit.vue'),
      },
    ],
  },
];
