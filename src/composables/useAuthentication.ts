import { storeToRefs } from 'pinia';
import { RegisterSnackyUserBody } from 'src/models/user.model';
import { useAuthenticationStore } from 'src/stores/authentication';
import useFirebaseServices from './useFirebaseServices';

export default function () {
  const authStore = useAuthenticationStore();

  const { setDbUser } = authStore;
  const {
    signInWithEmailAndPassword: signIn,
    signOut,
    createNewUser,
  } = useFirebaseServices();

  const authState = storeToRefs(authStore);

  async function signInWithEmailAndPassword(email: string, password: string) {
    await signIn(email, password);
  }

  function createUser(data: RegisterSnackyUserBody) {
    return createNewUser(data);
  }

  return {
    ...authState,

    signOut,
    signInWithEmailAndPassword,
    createUser,
  };
}
