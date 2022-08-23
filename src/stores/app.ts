import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const isAuthenticating = ref(true);
  const pageTitle = ref('page-title.home-page');

  function setAuthLoading(value: boolean) {
    isAuthenticating.value = value;
  }

  function setPageTitle(title: string) {
    pageTitle.value = title;
  }

  return {
    isAuthenticating,
    pageTitle,

    setAuthLoading,
    setPageTitle,
  };
});
