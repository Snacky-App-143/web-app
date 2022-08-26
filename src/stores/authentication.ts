import { defineStore } from 'pinia';
import { User } from 'firebase/auth';
import { ref } from 'vue';
import { FirestoreSnackyUser } from 'src/models/user.model';

export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref<User | null>(null);
  const dbUser = ref<FirestoreSnackyUser | null>(null);

  function setUser(data: User | null) {
    user.value = data;
  }

  function setDbUser(data: FirestoreSnackyUser | null) {
    dbUser.value = data;
  }

  return {
    user,
    dbUser,

    setUser,
    setDbUser,
  };
});
