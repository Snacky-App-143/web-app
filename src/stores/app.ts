import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const isAuthenticating = ref(true);

  function setAuthLoading(value: boolean) {
    isAuthenticating.value = value;
  }

  return {
    isAuthenticating,
    setAuthLoading,
  };
});
