<template>
  <q-item ref="uploadItemRef" :id="`upload-item-${item.id}`" class="text-black">
    <q-item-section>
      <q-item-label lines="1">
        {{ item.file.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon
        v-if="item.progress === 100"
        size="1.5rem"
        name="mdi-checkbox-marked-circle"
        color="positive"
      />
      <q-circular-progress
        v-else
        rounded
        size="1.2rem"
        :thickness="0.3"
        :value="item.progress"
        color="primary"
        track-color="grey-3"
        show-value
      >
        <q-icon
          v-if="isItemHovered"
          name="mdi-close"
          size=".7rem"
          class="cursor-pointer"
          @click="cancelUpload"
        ></q-icon>
      </q-circular-progress>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import useGallery, { UploadFile } from 'src/composables/useGallery';
import useSingleImageUpload from 'src/composables/useSingleImageUpload';
import useUtility from 'src/composables/useUtility';
import { ref, watch } from 'vue';

type Props = {
  item: UploadFile;
  uploadId: string;
};

type Emits = {
  (event: 'cancel-upload'): void;
  (event: 'update:item', value: Partial<UploadFile>): void;
  (event: 'next'): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { filesToUpload } = useGallery();
const { uploadResumableImage, uploadProgress } = useSingleImageUpload();
const { scrollToElement } = useUtility();

const uploadItemRef = ref<HTMLElement>();
const isItemHovered = useElementHover(uploadItemRef);

function cancelUpload() {
  emit('cancel-upload');
  emit('next');
}

watch(
  () => props.uploadId,
  (value) => {
    const index = filesToUpload.value.findIndex(({ id }) => value === id);
    if (index > -1 && filesToUpload.value[index].id === props.item.id) {
      emit('update:item', {
        uploadTask: uploadResumableImage(props.item.file, props.item.file.name),
        isUploading: true,
      });
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => uploadProgress.value,
  (value) => {
    emit('update:item', {
      progress: value,
      uploadedBytes: props.item.uploadTask?.snapshot.bytesTransferred,
    });

    if (value === 100) {
      emit('update:item', {
        isUploading: false,
        completed: true,
      });
      emit('next');

      const uploadingContainer = document
        .getElementsByClassName('uploading-card__item-list')
        .item(0);
      const uploadItemElement = document.getElementById(
        `upload-item-${props.item.id}`
      );

      if (uploadItemElement && uploadingContainer) {
        scrollToElement(
          uploadingContainer,
          uploadItemElement.offsetTop - 16,
          100
        );
      }
    }
  }
);
</script>
