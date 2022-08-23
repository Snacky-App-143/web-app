import { signInWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuth } from 'src/boot/firebase-auth';
import useUtility from './useUtility';

export default function () {
  const { showError } = useUtility();
  async function loginWithEmailPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      showError(error);
    }
  }

  return {
    loginWithEmailPassword,
  };
}
