<template>
  <q-card class="overflow-hidden">
    <q-card-section class="text-h6 q-pb-none flex items-center">
      {{ user.lastName }} {{ user.firstName }}
      <q-icon
        :color="user.gender === UserGenders.MALE ? 'blue' : 'pink'"
        :name="`mdi-gender-${user.gender.toLowerCase()}`"
      ></q-icon>
    </q-card-section>
    <q-card-section class="q-pt-none flex column q-col-gutter-xs">
      <UserInfoItem icon="mdi-shield-half-full" :info="user.role" />
      <UserInfoItem icon="mdi-at" :info="user.email" type="email" />
      <UserInfoItem icon="mdi-phone" :info="user.phoneNumber" type="phone" />
      <UserInfoItem icon="mdi-card-account-details" :info="user.passportId" />
      <UserInfoItem icon="mdi-cake-variant" :info="user.dob" type="date" />
    </q-card-section>
    <div v-if="isMyAccount" class="absolute-top-right full-height">
      <q-btn-group unelevated class="flex column full-height" spread square>
        <q-btn
          class="q-px-md"
          color="primary"
          icon="mdi-account-edit"
          @click="$emit('click-update')"
        ></q-btn>
        <q-btn
          class="q-px-md"
          color="negative"
          icon="mdi-delete"
          @click="$emit('click-delete')"
        ></q-btn>
      </q-btn-group>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import useAuthentication from 'src/composables/useAuthentication';
import { FirestoreSnackyUser, UserGenders } from 'src/models/user.model';
import { computed } from 'vue';
import UserInfoItem from './UserInfoItem.vue';

interface Emits {
  (e: 'click-update'): void;
  (e: 'click-delete'): void;
}

const props = defineProps<{ user: FirestoreSnackyUser }>();

defineEmits<Emits>();

const { dbUser } = useAuthentication();

const isMyAccount = computed(() => props.user.id === dbUser.value?.id);
</script>
