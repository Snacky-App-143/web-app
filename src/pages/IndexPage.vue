<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div
        v-for="(item, index) in navigationItems"
        :key="index"
        class="col-4 col-sm-3 col-md-2 col-xl-1"
      >
        <NavigationItem :navigation-item="item" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from 'src/stores/app';
import NavigationItem from '../components/home-page/NavigationItem.vue';

const appStore = useAppStore();
const { setPageTitle } = appStore;
const { navigationItems } = storeToRefs(appStore);

setPageTitle('page-title.home-page');
</script>
