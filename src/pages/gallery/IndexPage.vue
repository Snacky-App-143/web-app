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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-morph:addButton:uploadSteps:500.resize="morphGroupModel"
        fab
        icon="add"
        color="primary"
        @click="morphGroupModel = UploadSteps.UPLOADING"
      />
      <q-card
        v-morph:uploading:uploadSteps:500.resize="morphGroupModel"
        class="absolute-bottom-right bg-primary text-white"
        @click="morphGroupModel = UploadSteps.ADD_BUTTON"
      >
        <q-card-section class="flex items-center no-wrap q-pb-none">
          <q-spinner color="white" size="1.2rem" class="q-mr-sm" />
          <div>Uploading...</div>
        </q-card-section>
        <q-card-section>
          <q-list class="bg-white rounded-borders">
            <UploadItem
              v-for="(file, index) in filesToUpload"
              :key="index"
              :file="file"
            />
          </q-list>
        </q-card-section>
      </q-card>
    </q-page-sticky>

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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { RouteNames } from 'src/router/RouteNames';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import SnackySearchInput from 'src/components/common/SnackySearchInput.vue';
import { useDropZone } from '@vueuse/core';
import DropToUpload from 'components/gallery/DropToUpload.vue';
import UploadItem from 'components/gallery/UploadItem.vue';

enum UploadSteps {
  ADD_BUTTON = 'addButton',
  UPLOADING = 'uploading',
}

const appStore = useAppStore();
const { setPageTitle } = appStore;

const { mainLayoutMounted } = storeToRefs(appStore);
const searchKey = ref('');
const dropZoneRef = ref<HTMLDivElement>();
const morphGroupModel = ref<UploadSteps>(UploadSteps.ADD_BUTTON);
const filesToUpload = ref<File[]>([]);

function startUploadProcess(files: File[] | null) {
  filesToUpload.value = files ?? [];
  morphGroupModel.value = UploadSteps.UPLOADING;
}

const { isOverDropZone } = useDropZone(dropZoneRef, startUploadProcess);
setPageTitle('page-title.gallery');
</script>

<style lang="scss" scoped>
.gallery-page__uploading-card {
  max-width: 100%;
}
</style>
