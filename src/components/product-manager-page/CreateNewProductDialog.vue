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
import useFirebaseServices from 'src/composables/useFirebaseServices';
import useUtility from 'src/composables/useUtility';
import { Product } from 'src/models/product.model';
import { ref } from 'vue';
import ProductForm from './ProductForm.vue';

interface Emits {
  (e: 'update:model-value', value: boolean): void;
  (e: 'created'): void;
}

const emit = defineEmits<Emits>();
const { createNewProduct } = useFirebaseServices();
const { successNotify, t } = useUtility();

const isLoading = ref(false);

const toggle = (value: boolean) => {
  emit('update:model-value', value);
};

const submit = async (data: Product) => {
  const res = await createNewProduct(data);
  if (res) {
    successNotify({
      message: t('create-product-dialog.succeed'),
    });
    emit('created');
  }
};
</script>
