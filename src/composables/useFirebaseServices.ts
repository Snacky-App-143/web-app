import { setDoc, doc } from '@firebase/firestore';
import { db } from 'src/boot/firebase';
import { FirestoreSnackyUser } from 'src/models/user.model';
import { Collections } from 'src/types/firestore/Collections';
import useUtility from './useUtility';

export default function () {
  const { showError } = useUtility();

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

  async function createNewUser(
    data: FirestoreSnackyUser
  ): Promise<FirestoreSnackyUser | null> {
    try {
      const userDoc = doc(db, Collections.USERS, data.id);

      await setDoc(userDoc, data);

      return {
        ...data,
        id: userDoc.id,
      };
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
