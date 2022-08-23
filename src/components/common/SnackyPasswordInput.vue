<template>
  <q-input
    v-bind="$props"
    :type="!isPwd ? 'password' : 'text'"
    outlined
    dense
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <template #append>
      <q-icon
        :name="isPwd ? 'visibility' : 'visibility_off'"
        class="cursor-pointer"
        :color="isFocused ? 'primary' : undefined"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { QInputProps } from 'quasar';
import { ref } from 'vue';

interface Props extends QInputProps {}
defineProps<Props>();

const isPwd = ref(false);
const isFocused = ref(false);
</script>
