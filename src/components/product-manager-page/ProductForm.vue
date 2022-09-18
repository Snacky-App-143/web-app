<template>
  <q-card class="full-width">
    <q-icon
      class="product-form__close-button absolute cursor-pointer"
      name="mdi-close"
      color="primary"
      size="sm"
      @click="$emit('close')"
    ></q-icon>
    <q-form @submit.prevent="submit">
      <q-card-section class="text-h6 text-center q-pb-none">
        {{ title }}
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <!-- Name -->
            <SnackyInput
              v-model="form.productName"
              :label="$t('product-form.name.label')"
              :error="v$.productName.$error"
              :error-message="v$.productName.$errors[0]?.$message.toString()"
              @blur="v$.productName.$touch"
            />
          </div>
          <div class="col-12">
            <!-- Description -->
            <SnackyInput
              v-model="form.productDescription"
              :label="$t('product-form.description.label')"
              type="textarea"
              rows="auto"
              :error="false"
            />
          </div>
          <div class="col-12">
            <!-- Price -->
            <SnackyInput
              v-model="form.productPrice"
              :label="$t('product-form.price.label')"
              :error="v$.productPrice.$error"
              :error-message="v$.productPrice.$errors[0]?.$message.toString()"
              type="number"
              @blur="v$.productPrice.$touch"
            />
          </div>
          <div class="col-12">
            <!-- Status -->
            <q-toggle
              v-model="form.isProductActive"
              error
              color="primary"
              :label="$t('product-form.status.label')"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-btn
          type="submit"
          :disable="v$.$invalid"
          :loading="isLoading"
          color="primary"
          stretch
          class="full-width"
        >
          {{ $t('product-manager-page.create-product-user.cta') }}
        </q-btn>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import useForm from 'src/composables/useForm';
import { Product } from 'src/models/product.model';
import { computed, ref } from 'vue';
import SnackyInput from '../common/SnackyInput.vue';

interface Props {
  title?: string;
  isLoading?: boolean;
  product?: Product;
}
interface Emits {
  (e: 'close'): void;
  (e: 'submit', value: Product): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const {
  rules: { required, numeric },
} = useForm();

const form = ref<Product>({
  isProductActive: true,
  productName: '',
  productPrice: 0,
  productDescription: '',
});

const rules = computed(() => ({
  productName: { required },
  productPrice: { required, numeric },
}));

const v$ = useVuelidate(rules, form);

const submit = () => {
  emit('submit', form.value);
};

if (props.product) {
  form.value = {
    ...props.product,
  };
}
</script>

<style lang="scss" scoped>
.product-form__close-button {
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
</style>
