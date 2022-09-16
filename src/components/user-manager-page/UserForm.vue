<template>
  <q-card class="full-width">
    <q-icon
      class="user-form__close-button absolute cursor-pointer"
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
            <!-- Email -->
            <SnackyInput
              v-model="form.email"
              :label="$t('user-form.email.label')"
              :error="v$.email.$error"
              :error-message="v$.email.$errors[0]?.$message.toString()"
              :readonly="isUpdating"
              @blur="v$.email.$touch"
            />
          </div>

          <div v-if="!isUpdating" class="col-12">
            <!-- Password -->
            <SnackyPasswordInput
              v-model="form.password"
              :label="$t('user-form.password.label')"
              :error="v$.password.$error"
              :error-message="v$.password.$errors[0]?.$message.toString()"
              @blur="v$.password.$touch"
            />
          </div>

          <div v-if="!isUpdating" class="col-12">
            <!-- Confirm password -->
            <SnackyPasswordInput
              v-model="form.confirmPassword"
              :label="$t('user-form.confirm-password.label')"
              :error="v$.confirmPassword.$error"
              :error-message="
                v$.confirmPassword.$errors[0]?.$message.toString()
              "
              @blur="v$.confirmPassword.$touch"
            />
          </div>

          <div class="col-6">
            <!-- First Name -->
            <SnackyInput
              v-model="form.firstName"
              :label="$t('user-form.first-name.label')"
              :error="v$.firstName.$error"
              :error-message="v$.firstName.$errors[0]?.$message.toString()"
              @blur="v$.firstName.$touch"
            />
          </div>

          <div class="col-6">
            <!-- Last Name -->
            <SnackyInput
              v-model="form.lastName"
              :label="$t('user-form.last-name.label')"
              :error="v$.lastName.$error"
              :error-message="v$.lastName.$errors[0]?.$message.toString()"
              @blur="v$.lastName.$touch"
            />
          </div>

          <div class="col-12">
            <!-- Passport ID -->
            <SnackyInput
              v-model="form.passportId"
              :label="$t('user-form.passport-id.label')"
              :error="v$.passportId.$error"
              :error-message="v$.passportId.$errors[0]?.$message.toString()"
              @blur="v$.passportId.$touch"
            />
          </div>

          <div class="col-12">
            <!-- Phone Numer -->
            <SnackyInput
              v-model="form.phoneNumber"
              :label="$t('user-form.phone-number.label')"
              :error="v$.phoneNumber.$error"
              :error-message="v$.phoneNumber.$errors[0]?.$message.toString()"
              @blur="v$.phoneNumber.$touch"
            />
          </div>

          <div class="col-12">
            <!-- Date of birth -->
            <SnackyDatePicker
              v-model="form.dob"
              :label="$t('user-form.dob.label')"
              :error="v$.dob.$error"
              :error-message="v$.dob.$errors[0]?.$message.toString()"
              @blur="v$.dob.$touch"
            />
          </div>

          <div class="col-6">
            <!-- Gender -->
            <SnackySelectInput
              v-model="form.gender"
              :label="$t('user-form.gender.label')"
              :error="v$.gender.$error"
              :error-message="v$.gender.$errors[0]?.$message.toString()"
              :options="genderOptions"
              emit-value
              map-options
              @blur="v$.gender.$touch"
            />
          </div>

          <div class="col-6">
            <!-- Role -->
            <SnackySelectInput
              v-model="form.role"
              :label="$t('user-form.role.label')"
              :error="v$.role.$error"
              :error-message="v$.role.$errors[0]?.$message.toString()"
              :options="roleOptions"
              emit-value
              map-options
              @blur="v$.role.$touch"
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
          {{ $t('user-manager-page.create-new-user.cta') }}
        </q-btn>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import useForm from 'src/composables/useForm';
import useUtility from 'src/composables/useUtility';
import {
  FeRegisterSnackyUserBody,
  FirestoreSnackyUser,
  RegisterSnackyUserBody,
  UserGenders,
  UserRoles,
} from 'src/models/user.model';
import { computed, ref } from 'vue';
import SnackyInput from '../common/SnackyInput.vue';
import SnackyPasswordInput from '../common/SnackyPasswordInput.vue';
import SnackySelectInput from '../common/SnackySelectInput.vue';
import SnackyDatePicker from '../common/SnackyDatePicker.vue';
interface Props {
  title?: string;
  isUpdating?: boolean;
  isLoading?: boolean;
  userInfo?: FirestoreSnackyUser;
}
interface Emits {
  (e: 'close'): void;
  (e: 'submit', value: RegisterSnackyUserBody): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const {
  rules: { required, email, sameAs, requiredIf },
} = useForm();
const { t } = useUtility();

const genderOptions = [
  {
    label: t('user-form.gender.male.label'),
    value: UserGenders.MALE,
  },
  {
    label: t('user-form.gender.female.label'),
    value: UserGenders.FEMALE,
  },
  {
    label: t('user-form.gender.other.label'),
    value: UserGenders.OTHER,
  },
];
const roleOptions = [
  {
    label: t('user-form.role.admin.label'),
    value: UserRoles.ADMIN,
  },
  {
    label: t('user-form.role.owner.label'),
    value: UserRoles.OWNER,
  },
  {
    label: t('user-form.role.manager.label'),
    value: UserRoles.MANAGER,
  },
  {
    label: t('user-form.role.employee.label'),
    value: UserRoles.EMPLOYEE,
  },
];

const form = ref<FeRegisterSnackyUserBody>({
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
  confirmPassword: '',
});

const rules = computed(() => ({
  dob: { required },
  email: { required, email },
  firstName: { required },
  gender: { required },
  lastName: { required },
  passportId: { required },
  password: { required: requiredIf(!props.isUpdating) },
  confirmPassword: {
    required: requiredIf(!props.isUpdating),
    sameAsPassword: sameAs(form.value.password),
  },
  phoneNumber: { required },
  role: { required },
}));

const v$ = useVuelidate(rules, form);

function submit() {
  emit('submit', {
    dob: form.value.dob,
    email: form.value.email,
    firstName: form.value.firstName,
    gender: form.value.gender,
    id: form.value.id,
    lastName: form.value.lastName,
    passportId: form.value.passportId,
    password: form.value.password,
    phoneNumber: form.value.phoneNumber,
    role: form.value.role,
  });
}

if (props.userInfo) {
  form.value = {
    ...form.value,
    ...props.userInfo,
  };
}
</script>

<style lang="scss" scoped>
.user-form__close-button {
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
</style>
