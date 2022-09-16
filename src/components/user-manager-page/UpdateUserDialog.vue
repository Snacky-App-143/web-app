<template>
  <q-dialog v-bind="$attrs" position="bottom">
    <UserForm
      :title="$t('user-manager-page.update-user.title')"
      :is-loading="isLoading"
      is-updating
      :user-info="userInfo"
      @submit="submit"
      @close="toggle(false)"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import useAuthentication from 'src/composables/useAuthentication';
import useUtility from 'src/composables/useUtility';
import {
  FirestoreSnackyUser,
  RegisterSnackyUserBody,
} from 'src/models/user.model';
import { ref } from 'vue';
import UserForm from './UserForm.vue';

interface Emits {
  (e: 'update:model-value', value: boolean): void;
  (e: 'updated'): void;
}

interface Props {
  userInfo: FirestoreSnackyUser;
}
defineProps<Props>();
const emit = defineEmits<Emits>();

const { updateUserInfo } = useAuthentication();
const { successNotify, t } = useUtility();

const isLoading = ref(false);

function toggle(value: boolean) {
  emit('update:model-value', value);
}

async function submit(data: RegisterSnackyUserBody) {
  isLoading.value = true;
  const res = await updateUserInfo(data).finally(
    () => (isLoading.value = false)
  );
  if (res) {
    successNotify({
      message: t('update-user-dialog.succeed'),
    });
    toggle(false);
    emit('updated');
  }
}
</script>
