import { boot } from 'quasar/wrappers';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';
import { useAuthenticationStore } from 'src/stores/authentication';
import { useAppStore } from 'src/stores/app';
import { RouteNames } from 'src/router/RouteNames';

export const firebaseAuth = getAuth(firebaseApp);
export default boot(({ store, router }) => {
  const { setUser } = useAuthenticationStore(store);
  const { setAuthLoading } = useAppStore(store);
  onAuthStateChanged(firebaseAuth, async (user) => {
    setUser(user);

    if (user) {
      await router.push({ name: RouteNames.homePage });
    } else {
      await router.push({ name: RouteNames.loginPage });
    }
    setAuthLoading(false);
  });
});
