<template>
  <q-card class="full-width">
    <q-icon
      class="user-form__close-button absolute cursor-pointer"
      name="mdi-close"
      color="primary"
      size="sm"
      @click="$emit('close')"
    ></q-icon>
    <q-form>
      <q-card-section class="text-h6 text-center q-pb-none">{{
        title
      }}</q-card-section>
      <q-card-section>
        <!-- Email -->
        <SnackyInput
          v-model="form.email"
          :error="v$.email.$error"
          :error-message="v$.email.$errors[0]?.$message.toString()"
          @blur="v$.email.$touch"
        />

        <!-- Password -->
        <SnackyPasswordInput
          v-model="form.password"
          :error="v$.password.$error"
          :error-message="v$.password.$errors[0]?.$message.toString()"
          @blur="v$.password.$touch"
        />

        <!-- First Name -->
        <SnackyInput
          v-model="form.firstName"
          :error="v$.firstName.$error"
          :error-message="v$.firstName.$errors[0]?.$message.toString()"
          @blur="v$.firstName.$touch"
        />

        <!-- Last Name -->
        <SnackyInput
          v-model="form.lastName"
          :error="v$.lastName.$error"
          :error-message="v$.lastName.$errors[0]?.$message.toString()"
          @blur="v$.lastName.$touch"
        />

        <!-- Passport ID -->
        <SnackyInput
          v-model="form.passportId"
          :error="v$.passportId.$error"
          :error-message="v$.passportId.$errors[0]?.$message.toString()"
          @blur="v$.passportId.$touch"
        />

        <!-- Phone Numer -->
        <SnackyInput
          v-model="form.phoneNumber"
          :error="v$.phoneNumber.$error"
          :error-message="v$.phoneNumber.$errors[0]?.$message.toString()"
          @blur="v$.phoneNumber.$touch"
        />

        <!-- Date of birth -->
        <SnackyInput
          v-model="form.dob"
          :error="v$.dob.$error"
          :error-message="v$.dob.$errors[0]?.$message.toString()"
          @blur="v$.dob.$touch"
        />

        <!-- Gender -->
        <SnackyInput
          v-model="form.gender"
          :error="v$.gender.$error"
          :error-message="v$.gender.$errors[0]?.$message.toString()"
          @blur="v$.gender.$touch"
        />

        <!-- Role -->
        <SnackyInput
          v-model="form.role"
          :error="v$.role.$error"
          :error-message="v$.role.$errors[0]?.$message.toString()"
          @blur="v$.role.$touch"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import useForm from 'src/composables/useForm';
import {
  RegisterSnackyUserBody,
  UserGenders,
  UserRoles,
} from 'src/models/user.model';
import { ref } from 'vue';
import SnackyInput from '../common/SnackyInput.vue';
import SnackyPasswordInput from '../common/SnackyPasswordInput.vue';
interface Props {
  title?: string;
  isUpdating?: boolean;
}
interface Emits {
  (e: 'close'): void;
}

defineProps<Props>();
defineEmits<Emits>();

const {
  rules: { required, email },
} = useForm();

const form = ref<RegisterSnackyUserBody>({
  dob: '',
  email: '',
  firstName: '',
  gender: UserGenders.FEMALE,
  id: '',
  lastName: '',
  passportId: '',
  password: '',
  phoneNumber: '',
  role: UserRoles.ADMIN,
});

const rules = {
  dob: { required },
  email: { required, email },
  firstName: { required },
  gender: { required },
  lastName: { required },
  passportId: { required },
  password: { required },
  phoneNumber: { required },
  role: { required },
};

const v$ = useVuelidate(rules, form);
</script>

<style lang="scss" scoped>
.user-form__close-button {
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
</style>
