import useFirebaseServices from './useFirebaseServices';
import useUtility from './useUtility';

export default function () {
  const { showError } = useUtility();
  const { signInWithEmailAndPassword: signIn } = useFirebaseServices();

  async function signInWithEmailAndPassword(email: string, password: string) {
    try {
      await signIn(email, password);
    } catch (error) {
      showError(error);
    }
  }

  return {
    signInWithEmailAndPassword,
  };
}
