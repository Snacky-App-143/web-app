import { boot } from 'quasar/wrappers';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';
import { useAuthenticationStore } from 'src/stores/authentication';
import { useAppStore } from 'src/stores/app';
import { RouteNames } from 'src/router/RouteNames';
import { showError } from 'src/modules/helpers';

export const firebaseAuth = getAuth(firebaseApp);

export default boot(async ({ store, router }) => {
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
});
