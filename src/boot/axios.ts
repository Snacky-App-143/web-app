import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_ENDPOINT });

async function onGoodReq(config: AxiosRequestConfig) {
  let token: string | null = null;
  if (!import.meta.env.SSR) {
    const { firebaseAuth } = await import('./firebase-auth');
    const { getIdToken } = await import('@firebase/auth');
    token = firebaseAuth.currentUser
      ? await getIdToken(firebaseAuth.currentUser)
      : null;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function onBadReq(error: unknown) {
  console.error('[REQUEST ERROR]: ', error);
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  api.interceptors.request.use(async (config) => {
    return await onGoodReq(config);
  }, onBadReq);

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
