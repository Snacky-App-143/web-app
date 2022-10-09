import { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './RouteNames';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: RouteNames.homePage,
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/login',
        name: RouteNames.loginPage,
        component: () => import('pages/login/LoginPage.vue'),
      },
      {
        path: '/user-manager',
        name: RouteNames.usersPage,
        component: () => import('pages/users/UserManagerPage.vue'),
      },
      {
        path: '/product-manager',
        name: RouteNames.productsPage,
        component: () => import('pages/products/ProductManagerPage.vue'),
      },
      {
        path: '/gallery',
        name: RouteNames.galleryPage,
        component: () => import('src/pages/gallery/GalleryPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
