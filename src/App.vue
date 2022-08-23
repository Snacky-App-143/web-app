<template>
  <div v-if="isAuthenticating" class="app__loader flex flex-center">
    <q-spinner color="primary" size="4rem"></q-spinner>
  </div>
  <router-view v-else />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from './stores/app';

const appStore = useAppStore();

const { isAuthenticating } = storeToRefs(appStore);
</script>

<style lang="scss" scoped>
.app__loader {
  height: 100vh;
}
</style>
