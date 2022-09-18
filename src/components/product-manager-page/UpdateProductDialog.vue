<template>
  <q-dialog v-bind="$attrs" position="bottom">
    <ProductForm
      :title="$t('product-manager-page.update-product.title')"
      :is-loading="isLoading"
      @submit="submit"
      @close="toggle(false)"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import useFirebaseServices from 'src/composables/useFirebaseServices';
import { FirestoreProduct, Product } from 'src/models/product.model';
import { ref } from 'vue';
import ProductForm from './ProductForm.vue';

interface Emits {
  (e: 'update:model-value', value: boolean): void;
  (e: 'updated'): void;
}
interface Props {
  product: FirestoreProduct;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { updateProduct } = useFirebaseServices();

const isLoading = ref(false);

function toggle(value: boolean) {
  emit('update:model-value', value);
}

async function submit(data: Product) {
  const res = await updateProduct(props.product.id, data);

  if (res) {
    emit('updated');
  }
}
</script>
