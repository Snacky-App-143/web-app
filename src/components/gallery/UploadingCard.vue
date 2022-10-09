<template>
  <q-card class="uploading-card bg-primary text-white">
    <q-card-section
      class="flex items-center no-wrap text-weight-medium text-body1"
      :class="{
        'q-pb-none': isItemListVisible,
      }"
    >
      <div v-if="totalProgress === 100">Uploaded</div>
      <template v-else>
        <q-spinner color="white" size="1.2rem" class="q-mr-sm" />
        <div>Uploading...</div>
      </template>
      <q-space />
      <div class="text-weight-bold text-body2 q-ml-xl">
        {{ totalProgress.toFixed(2) }}%
      </div>
      <q-btn
        color="white"
        unelevated
        size="xs"
        round
        class="uploading-card__toggle-button q-mx-sm"
        :class="{
          'rotate-180': !isItemListVisible,
        }"
        @click="isItemListVisible = !isItemListVisible"
      >
        <q-icon name="mdi-chevron-down" color="primary" size="1.5rem"></q-icon>
      </q-btn>
      <q-btn color="white" unelevated size="xs" round>
        <q-icon
          name="mdi-close"
          color="grey-7"
          size="1.4rem"
          @click="closeUploadingCard"
        ></q-icon>
      </q-btn>
    </q-card-section>
    <q-card-section v-show="isItemListVisible">
      <q-list
        v-if="morphGroupModel === UploadSteps.UPLOADING"
        class="bg-white rounded-borders"
      >
        <UploadItem
          v-for="(item, index) in filesToUpload"
          :key="index"
          :item="item"
          @cancel-upload="cancelUpload(index)"
        />
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useGallery, { UploadSteps } from 'src/composables/useGallery';
import useSingleImageUpload from 'src/composables/useSingleImageUpload';
import UploadItem from 'components/gallery/UploadItem.vue';
import { useRoute } from 'vue-router';
import { RouteNames } from 'src/router/RouteNames';

const emit = defineEmits(['close']);

const route = useRoute();
const { uploadResumableImage, uploadProgress, uploadedBytes } =
  useSingleImageUpload();
const {
  filesToUpload,
  totalProgress,
  isUploadCardVisible,
  morphGroupModel,
  isItemListVisible,
} = useGallery();

const uploadIndex = computed(() =>
  filesToUpload.value.findIndex(({ completed }) => completed === false)
);
const fileToUpload = computed(() => filesToUpload.value[uploadIndex.value]);

function closeUploadingCard() {
  emit('close');
  filesToUpload.value.forEach((item) => item.uploadTask?.cancel());
  filesToUpload.value = [];
  if (route.name !== RouteNames.galleryPage) {
    isUploadCardVisible.value = false;
  }
}

function cancelUpload(index: number) {
  filesToUpload.value[index].uploadTask?.cancel();
  filesToUpload.value.splice(index, 1);
}

watch(
  () => uploadIndex.value,
  (newValue, oldValue) => {
    if (newValue > -1 && newValue !== oldValue) {
      fileToUpload.value.uploadTask = uploadResumableImage(
        fileToUpload.value.file,
        fileToUpload.value.file.name
      );

      fileToUpload.value.isUploading = true;
    }
  }
);

watch(
  () => uploadProgress.value,
  (value) => {
    fileToUpload.value.progress = value;
    fileToUpload.value.uploadedBytes = uploadedBytes.value;

    if (value === 100) {
      fileToUpload.value.completed = true;
      fileToUpload.value.isUploading = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.uploading-card {
  max-width: 100vw;
}

.uploading-card__toggle-button {
  transition: all 200ms ease-in-out;
}
</style>
