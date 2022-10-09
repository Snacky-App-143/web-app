<template>
  <q-item ref="uploadItemRef" class="text-black">
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
          size=".8rem"
          class="cursor-pointer"
          @click="cancelUpload"
        ></q-icon>
      </q-circular-progress>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { UploadFile } from 'src/composables/useGallery';
import { ref } from 'vue';

type Props = {
  item: UploadFile;
};

defineProps<Props>();
const emit = defineEmits(['cancel-upload']);

const uploadItemRef = ref<HTMLElement>();
const isItemHovered = useElementHover(uploadItemRef);

function cancelUpload() {
  emit('cancel-upload');
}
</script>
