import { defineStore } from 'pinia';
import { User } from 'firebase/auth';
import { ref } from 'vue';

export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref<User | null>(null);

  function setUser(data: User | null) {
    user.value = data;
  }

  return {
    user,
    setUser,
  };
});
