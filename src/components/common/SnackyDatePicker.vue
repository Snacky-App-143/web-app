<template>
  <q-input
    :model-value="modelValue"
    mask="date"
    :rules="['date']"
    outlined
    dense
    @update:model-value="$emit('update:model-value', $event)"
  >
    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
      <q-date
        class="full-width"
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value', $event)"
      >
        <div class="row items-center justify-end">
          <q-btn v-close-popup label="Close" color="primary" flat />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-input>
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar';

interface Props extends QInputProps {
  modelValue: string;
}

interface Emits {
  (e: 'update:model-value', value: string | null | undefined): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
