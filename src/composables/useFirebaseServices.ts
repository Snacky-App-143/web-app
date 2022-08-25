import useUtility from './useUtility';

export default function () {
  async function signInWithEmailAndPassword(email: string, password: string) {
    const { showError } = useUtility();

    try {
      if (!import.meta.env.SSR) {
        const { firebaseAuth } = await import('src/boot/firebase-auth');
        const { signInWithEmailAndPassword: signIn } = await import(
          '@firebase/auth'
        );

        return signIn(firebaseAuth, email, password);
      }
    } catch (error) {
      showError(error);
    }
  }

  return {
    signInWithEmailAndPassword,
  };
}
