<template>
  <q-no-ssr v-if="isAuthenticating">
    <div class="app__loader flex flex-center full-width">
      <q-spinner color="primary" size="4rem"></q-spinner>
    </div>
  </q-no-ssr>
  <router-view v-else />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import { MetaOptions } from 'quasar/dist/types/meta';
import { computed } from 'vue';
import useUtility from './composables/useUtility';
import { useAppStore } from './stores/app';

const appStore = useAppStore();

const { isAuthenticating, pageTitle } = storeToRefs(appStore);
const { t } = useUtility();

const metaData = computed<MetaOptions>(() => ({
  title: t(pageTitle.value),
  titleTemplate: (title) => `${title} - Snacky`,
}));

useMeta(() => metaData.value);
</script>

<style lang="scss" scoped>
.app__loader {
  height: 100vh;
}
</style>
