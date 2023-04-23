import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

let url = null;

if (process.env.DEV) {
  url = 'http://localhost:3000/api';
} else {
  url = 'https://api.localhost.com/api';
}

const api = axios.create({ baseURL: url! });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
