<template>
  <q-page>
    <template v-if="mainLayoutMounted">
      <Teleport :to="`#${MainLayoutSlot.middleToolbar}`">
        <SnackySearchInput v-model="searchKey" />
      </Teleport>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import SnackySearchInput from 'components/common/SnackySearchInput.vue';

const appStore = useAppStore();
const { setPageTitle } = appStore;

const { mainLayoutMounted } = storeToRefs(appStore);
const searchKey = ref('');

setPageTitle('page-title.user-manager');
</script>

<style lang="scss" scoped>
.user-manager-page__search {
  min-width: 50%;
}
</style>
