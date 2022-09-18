import { RouteLocationRaw } from 'vue-router';

export type NavigationItem = {
  icon: string;
  title: string;
  to: RouteLocationRaw;
};
