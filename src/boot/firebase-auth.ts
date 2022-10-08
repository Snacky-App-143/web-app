import { boot } from 'quasar/wrappers';
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebaseApp } from './firebase';
import { useAuthenticationStore } from 'src/stores/authentication';
import { useAppStore } from 'src/stores/app';
import { RouteNames } from 'src/router/RouteNames';
import { showError } from 'src/modules/helpers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $firebaseAuth: Auth;
  }
}

export const firebaseAuth = getAuth(firebaseApp);

export default boot(async ({ app, store, router }) => {
  // Connect to emulator on local
  if (process.env.IS_EMULATOR_ENABLE) {
    connectAuthEmulator(firebaseAuth, process.env.FIREBASE_AUTH_ENDPOINT);
  }

  const { setUser } = useAuthenticationStore(store);
  const { setAuthLoading } = useAppStore(store);

  onAuthStateChanged(
    firebaseAuth,
    async (user) => {
      setUser(user);
      const route = router.currentRoute.value;

      if (user && route.name === RouteNames.loginPage) {
        await router.push({ name: RouteNames.homePage });
      } else if (!user) {
        await router.push({ name: RouteNames.loginPage });
      }

      setAuthLoading(false);
    },
    showError
  );

  app.config.globalProperties.$firebaseAuth = firebaseAuth;
});
