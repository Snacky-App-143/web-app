<template>
  <q-page ref="dropZoneRef" padding>
    <template v-if="mainLayoutMounted">
      <Teleport :to="`#${MainLayoutSlot.middleToolbar}`">
        <SnackySearchInput v-model="searchKey" />
      </Teleport>

      <Teleport :to="`#${MainLayoutSlot.prependExtraBtn}`">
        <q-btn icon="mdi-home" :to="{ name: RouteNames.homePage }"></q-btn>
      </Teleport>

      <Teleport :to="`#${MainLayoutSlot.extraBtn}`">
        <q-btn icon="mdi-file-check" @click="isSelectEnabled = true"></q-btn>
      </Teleport>
    </template>

    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <q-toolbar
        v-if="isSelectEnabled"
        class="q-pr-none fixed-top-left z-top bg-primary text-white"
      >
        <q-toolbar-title v-if="selectedImages.length">
          Selected {{ selectedImages.length }}
        </q-toolbar-title>
        <q-toolbar-title v-else> Select image </q-toolbar-title>
        <q-space></q-space>

        <q-btn-group stretch flat color="white">
          <q-btn icon="mdi-delete" @click="startDeleteImages"></q-btn>
          <q-btn
            icon="mdi-close"
            @click="
              isSelectEnabled = false;
              selectedImages = [];
            "
          ></q-btn>
        </q-btn-group>
      </q-toolbar>
    </transition>

    <div class="row q-col-gutter-xs">
      <div
        v-for="(item, index) in filteredImages"
        :key="index"
        class="col-4 col-md-3 col-lg-2"
      >
        <GalleryItem
          :item="item"
          :is-select-enabled="isSelectEnabled"
          :is-selected="selectedImages.includes(item)"
          @select-image="selectImage(index)"
        />
      </div>
    </div>

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
import { computed, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { RouteNames } from 'src/router/RouteNames';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import SnackySearchInput from 'src/components/common/SnackySearchInput.vue';
import { useDropZone } from '@vueuse/core';
import DropToUpload from 'components/gallery/DropToUpload.vue';
import useGallery from 'src/composables/useGallery';
import GalleryItem from 'src/components/gallery/GalleryItem.vue';
import { StorageReference } from '@firebase/storage';
import useUtility from 'src/composables/useUtility';
import { AppEvents } from 'src/types/event-bus';

const { bus, confirm, t, successNotify } = useUtility();
const appStore = useAppStore();
const {
  startUploadProcess,
  isUploadCardVisible,
  totalProgress,
  totalSizes,
  getAllGalleryItems,
  deleteGalleryItems,
  galleryItems,
} = useGallery();
const { setPageTitle } = appStore;

const { mainLayoutMounted } = storeToRefs(appStore);
const searchKey = ref('');
const dropZoneRef = ref<HTMLDivElement>();
const isSelectEnabled = ref(false);
const selectedImages = ref<StorageReference[]>([]);

const filteredImages = computed(() =>
  galleryItems.value.filter(
    ({ name }) => !searchKey.value || name.includes(searchKey.value)
  )
);

const { isOverDropZone } = useDropZone(dropZoneRef, startUploadProcess);

const selectImage = (index: number) => {
  const selectedImage = galleryItems.value[index];
  const imageIndexInSelectedImages = selectedImages.value.findIndex(
    (item) => item === selectedImage
  );
  if (imageIndexInSelectedImages > -1) {
    selectedImages.value.splice(imageIndexInSelectedImages, 1);
    return;
  }

  selectedImages.value.push(galleryItems.value[index]);
};

const startDeleteImages = () => {
  if (!selectedImages.value.length) {
    return;
  }

  confirm({
    message: t('gallery.confirm-deletion'),
    ok: t('gallery.confirm-deletion.ok'),
    cancel: t('gallery.confirm-deletion.cancel'),
    color: 'negative',
  }).onOk(async () => {
    await deleteGalleryItems(selectedImages.value);
    getAllGalleryItems();
    selectedImages.value = [];
    successNotify({
      message: t('gallery.confirm-deletion.success'),
    });
  });
};

setPageTitle('page-title.gallery');
isUploadCardVisible.value = true;
getAllGalleryItems();

bus.on(AppEvents.RELOAD_GALLERY, () => {
  getAllGalleryItems();
});

onUnmounted(() => {
  if (totalProgress.value === 100 || totalSizes.value === 0) {
    isUploadCardVisible.value = false;
  }
});
</script>
