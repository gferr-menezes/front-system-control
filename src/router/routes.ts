import { RouteRecordRaw } from 'vue-router';

import auth from 'src/modules/auth/routes';
import dashboard from 'src/modules/dashboard/routes';

let baseRoutes: RouteRecordRaw[] = [];
const systemRoutes = baseRoutes.concat(auth, dashboard);

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: systemRoutes,
    // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
