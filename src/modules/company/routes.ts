export default [
  {
    path: '/',
    component: () => import('./Main.vue'),
    children: [
      {
        path: '/adm/company',
        name: 'company',
        component: () => import('./pages/Index.vue'),
      },
      {
        path: '/adm/company/create',
        name: 'companyCreate',
        component: () => import('./pages/CreateOrEdit.vue'),
      },
      {
        path: '/adm/company/edit/:id',
        name: 'companyEdit',
        component: () => import('./pages/CreateOrEdit.vue'),
      },
    ],
  },
];
