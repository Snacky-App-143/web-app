import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const isAuthenticating = ref(true);
  const pageTitle = ref('page-title.home-page');
  const mainLayoutMounted = ref(false);

  function setAuthLoading(value: boolean) {
    isAuthenticating.value = value;
  }

  function setPageTitle(title: string) {
    pageTitle.value = title;
  }

  function setMainLayoutMounted(value = true) {
    mainLayoutMounted.value = value;
  }

  return {
    isAuthenticating,
    pageTitle,
    mainLayoutMounted,

    setAuthLoading,
    setPageTitle,
    setMainLayoutMounted,
  };
});
