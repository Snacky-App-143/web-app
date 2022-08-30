<template>
  <q-dialog v-bind="$attrs" position="bottom">
    <UserForm
      :title="$t('user-manager-page.create-new-user.title')"
      :is-loading="isLoading"
      @submit="submit"
      @close="toggle(false)"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import useAuthentication from 'src/composables/useAuthentication';
import useUtility from 'src/composables/useUtility';
import { RegisterSnackyUserBody } from 'src/models/user.model';
import { ref } from 'vue';
import UserForm from './UserForm.vue';

interface Emits {
  (e: 'update:model-value', value: boolean): void;
}

const emit = defineEmits<Emits>();

const { createUser } = useAuthentication();
const { successNotify, t } = useUtility();

const isLoading = ref(false);

function toggle(value: boolean) {
  emit('update:model-value', value);
}

async function submit(data: RegisterSnackyUserBody) {
  isLoading.value = true;
  const res = await createUser(data).finally(() => (isLoading.value = false));
  if (res) {
    successNotify({
      message: t('create-new-user-dialog.succeed'),
    });
    toggle(false);
  }
}
</script>
