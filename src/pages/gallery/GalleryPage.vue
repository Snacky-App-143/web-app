<template>
  <q-page ref="dropZoneRef" padding>
    <template v-if="mainLayoutMounted">
      <Teleport :to="`#${MainLayoutSlot.middleToolbar}`">
        <SnackySearchInput v-model="searchKey" />
      </Teleport>

      <Teleport :to="`#${MainLayoutSlot.prependExtraBtn}`">
        <q-btn icon="mdi-home" :to="{ name: RouteNames.homePage }"></q-btn>
      </Teleport>
    </template>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <DropToUpload v-if="isOverDropZone" class="absolute-top-left fit" />
    </transition>
  </q-page>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { RouteNames } from 'src/router/RouteNames';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import SnackySearchInput from 'src/components/common/SnackySearchInput.vue';
import { useDropZone } from '@vueuse/core';
import DropToUpload from 'components/gallery/DropToUpload.vue';
import useGallery from 'src/composables/useGallery';

const appStore = useAppStore();
const {
  startUploadProcess,
  isUploadCardVisible,
  totalProgress,
  totalSizes,
  getAllGalleryItems,
} = useGallery();
const { setPageTitle } = appStore;

const { mainLayoutMounted } = storeToRefs(appStore);
const searchKey = ref('');
const dropZoneRef = ref<HTMLDivElement>();

const { isOverDropZone } = useDropZone(dropZoneRef, startUploadProcess);
setPageTitle('page-title.gallery');
isUploadCardVisible.value = true;
getAllGalleryItems();

onUnmounted(() => {
  if (totalProgress.value === 100 || totalSizes.value === 0) {
    isUploadCardVisible.value = false;
  }
});
</script>
