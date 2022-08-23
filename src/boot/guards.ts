import { boot } from 'quasar/wrappers';
import { RouteNames } from 'src/router/RouteNames';
import { useAuthenticationStore } from 'src/stores/authentication';

export default boot(({ router, store }) => {
  const authStore = useAuthenticationStore(store);
  router.beforeEach((to, from, next) => {
    if (!authStore.$state.user && to.name !== RouteNames.loginPage) {
      next({ name: RouteNames.loginPage });
    } else if (authStore.$state.user && to.name === RouteNames.loginPage) {
      next(from);
    } else {
      next();
    }
  });
});
