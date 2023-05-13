import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import routes from './routes';
import { getUserLogged } from 'src/util/utils';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  /**
   * Router protected
   */
  Router.beforeEach(async (to, from, next) => {
    // if (to.path === '/' && getUserLogged()) {
    //   next('/dashboard');
    // }

    if (to.path === '/adm' && !getUserLogged()) {
      next({ path: '/auth' });
    }
    if (to.path === '/adm' && getUserLogged()) {
      next({ path: '/adm/dashboard' });
    } else {
      next();
    }

    // if (to.name != 'auth' && getUserLogged()) {
    //   next();
    // } else if (to.name === 'auth') {
    //   next();
    // } else {
    //   next({ path: '/auth' });
    // }
  });

  return Router;
});
