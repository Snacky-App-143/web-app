<template>
  <q-page padding>
    <template v-if="mainLayoutMounted">
      <Teleport :to="`#${MainLayoutSlot.middleToolbar}`">
        <SnackySearchInput v-model="searchKey" />
      </Teleport>

      <Teleport :to="`#${MainLayoutSlot.prependExtraBtn}`">
        <q-btn icon="mdi-home" :to="{ name: RouteNames.homePage }"></q-btn>
      </Teleport>
    </template>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="isCreateProductVisible = true"
      />
    </q-page-sticky>

    <CreateNewProductDialog v-model="isCreateProductVisible" @created="init" />
  </q-page>
</template>

<script lang="ts" setup>
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import { RouteNames } from 'src/router/RouteNames';
import SnackySearchInput from 'src/components/common/SnackySearchInput.vue';
import { ref } from 'vue';
import { useAppStore } from 'src/stores/app';
import { storeToRefs } from 'pinia';
import CreateNewProductDialog from 'src/components/product-manager-page/CreateNewProductDialog.vue';
import useFirebaseServices from 'src/composables/useFirebaseServices';

const appStore = useAppStore();
const { getProductList } = useFirebaseServices();
const { setPageTitle } = appStore;

const { mainLayoutMounted } = storeToRefs(appStore);

const searchKey = ref('');
const isCreateProductVisible = ref(false);

function init() {
  getProductList();
}

setPageTitle('page-title.product-manager');
init();
</script>
