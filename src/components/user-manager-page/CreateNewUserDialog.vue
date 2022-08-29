<template>
  <q-dialog v-bind="$attrs" position="bottom">
    <UserForm
      :title="$t('user-manager-page.create-new-user.title')"
      @close="$emit('update:model-value', false)"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import UserForm from './UserForm.vue';

interface Emits {
  (e: 'update:model-value', value: boolean): void;
}

defineEmits<Emits>();
</script>
