import { RegisterSnackyUserBody } from 'src/models/user.model';
import useApiServices from './useApiServices';
import useUtility from './useUtility';

export default function () {
  const { showError, successNotify, t } = useUtility();
  const { createNewUserApi } = useApiServices();

  async function signInWithEmailAndPassword(email: string, password: string) {
    if (!import.meta.env.SSR) {
      const { firebaseAuth } = await import('src/boot/firebase-auth');
      const { signInWithEmailAndPassword: signIn } = await import(
        '@firebase/auth'
      );

      return signIn(firebaseAuth, email, password).catch(showError);
    }

    return null;
  }

  async function signOut() {
    if (!import.meta.env.SSR) {
      const { firebaseAuth } = await import('src/boot/firebase-auth');
      const { signOut: firebaseSignOut } = await import('@firebase/auth');

      return firebaseSignOut(firebaseAuth);
    }
  }

  async function createNewUser(data: RegisterSnackyUserBody) {
    try {
      const response = await createNewUserApi(data);

      if (response.status === 200) {
        successNotify({
          message: t('success-notify.create-user'),
        });

        return response.data;
      }

      return null;
    } catch (error) {
      showError(error);
      return null;
    }
  }

  return {
    signInWithEmailAndPassword,
    signOut,
    createNewUser,
  };
}
