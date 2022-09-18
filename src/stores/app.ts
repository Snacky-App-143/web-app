import { defineStore } from 'pinia';
import { RouteNames } from 'src/router/RouteNames';
import { NavigationItem } from 'src/types/router/NavigationItem';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const isAuthenticating = ref(true);
  const pageTitle = ref('page-title.home-page');
  const mainLayoutMounted = ref(false);
  const navigationItems = ref<NavigationItem[]>([
    {
      icon: 'mdi-account',
      title: 'navigation-item.user-manager',
      to: { name: RouteNames.usersPage },
    },
    {
      icon: 'mdi-food',
      title: 'navigation-item.products',
      to: { name: RouteNames.productsPage },
    },
  ]);

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
    navigationItems,

    setAuthLoading,
    setPageTitle,
    setMainLayoutMounted,
  };
});
