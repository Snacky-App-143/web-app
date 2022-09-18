<template>
  <q-dialog v-bind="$attrs" position="bottom">
    <ProductForm
      :title="$t('product-manager-page.create-new-product.title')"
      :is-loading="isLoading"
      @submit="submit"
      @close="toggle(false)"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import { Product } from 'src/models/product.model';
import { ref } from 'vue';
import ProductForm from './ProductForm.vue';

interface Emits {
  (e: 'update:model-value', value: boolean): void;
  (e: 'created'): void;
}

const emit = defineEmits<Emits>();

const isLoading = ref(false);

function toggle(value: boolean) {
  emit('update:model-value', value);
}

function submit(data: Product) {
  // TODO: integrate create product service
}
</script>
