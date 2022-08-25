<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-4 col-sm-3 col-md-2 col-xl-1">
        <NavigationItem
          icon="mdi-account"
          :title="$t('navigation-item.user-manager')"
          :to="{ name: RouteNames.usersPage }"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { RouteNames } from 'src/router/RouteNames';
import { useAppStore } from 'src/stores/app';
import NavigationItem from '../components/home-page/NavigationItem.vue';

const { setPageTitle } = useAppStore();

setPageTitle('page-title.home-page');
</script>
