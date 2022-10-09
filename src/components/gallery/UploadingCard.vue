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
          :upload-id="fileToUploadId?.id || ''"
          @update:item="updateItemProgress($event, index)"
          @cancel-upload="cancelUpload(index)"
        />
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import useGallery, {
  UploadFile,
  UploadSteps,
} from 'src/composables/useGallery';
import UploadItem from 'components/gallery/UploadItem.vue';
import { useRoute } from 'vue-router';
import { RouteNames } from 'src/router/RouteNames';

const emit = defineEmits(['close']);

const route = useRoute();

const {
  filesToUpload,
  totalProgress,
  isUploadCardVisible,
  morphGroupModel,
  isItemListVisible,
  fileToUploadId,
} = useGallery();

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

  if (!filesToUpload.value.length) {
    closeUploadingCard();
  }
}

function updateItemProgress(data: Partial<UploadFile>, index: number) {
  filesToUpload.value[index] = {
    ...filesToUpload.value[index],
    ...data,
  };
}
</script>

<style lang="scss" scoped>
.uploading-card {
  max-width: 100vw;
}

.uploading-card__toggle-button {
  transition: all 200ms ease-in-out;
}
</style>
