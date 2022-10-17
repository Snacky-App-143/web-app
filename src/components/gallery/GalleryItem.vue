<template>
  <q-img
    :src="src"
    :ratio="1"
    fit="cover"
    :loading="'lazy'"
    @contextmenu.prevent="
      isSelectEnabled ? null : $emit('select-image-by-hold')
    "
    @click="isSelectEnabled ? $emit('select-image') : null"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <span v-if="isSelectEnabled" class="absolute-top-right q-pa-xs bg-white">
        <q-checkbox
          :model-value="!!isSelected"
          dense
          @update:model-value="$emit('select-image')"
        ></q-checkbox>
      </span>
    </transition>
    <template #loading>
      <q-skeleton type="rect" class="fit"></q-skeleton>
    </template>
    <template #error>
      <q-skeleton type="rect" class="fit"></q-skeleton>
    </template>
  </q-img>
</template>

<script setup lang="ts">
import { getDownloadURL, StorageReference } from '@firebase/storage';
import useFirebaseServices from 'src/composables/useFirebaseServices';
import { ref } from 'vue';

type Props = {
  item: StorageReference;
  isSelectEnabled?: boolean;
  isSelected?: boolean;
};
type Emits = {
  (event: 'select-image'): void;
  (event: 'select-image-by-hold'): void;
};

const props = defineProps<Props>();
defineEmits<Emits>();

const { getStorageRef } = useFirebaseServices();

const src = ref<string>();

const init = async () => {
  src.value = await getDownloadURL(getStorageRef(props.item.fullPath));
};

init();
</script>
