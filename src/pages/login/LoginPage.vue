<template>
  <q-page class="flex column justify-center items-center">
    <q-form class="login-page__form full-width" @submit.prevent="submit">
      <q-card>
        <q-card-section class="flex column q-col-gutter-sm q-pb-sm">
          <SnackyInput
            v-model="form.email"
            label="Email"
            name="Email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message.toString()"
            @blur="v$.email.$touch"
          />
          <SnackyPasswordInput
            v-model="form.password"
            label="Password"
            :error="v$.password.$error"
            :error-message="v$.password.$errors[0]?.$message.toString()"
            @blur="v$.password.$touch"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-btn
            type="submit"
            color="primary"
            class="full-width"
            unelevated
            :disable="v$.$invalid"
          >
            Login
          </q-btn>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import SnackyInput from 'src/components/common/SnackyInput.vue';
import { ref } from 'vue';
import SnackyPasswordInput from 'src/components/common/SnackyPasswordInput.vue';
import useVuelidate from '@vuelidate/core';
import useForm from 'src/composables/useForm';
import useAuthentication from 'src/composables/useAuthentication';
import { useAppStore } from 'src/stores/app';

const {
  rules: { email, required },
} = useForm();

const { loginWithEmailPassword } = useAuthentication();
const { setPageTitle } = useAppStore();

const form = ref({
  email: '',
  password: '',
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, form);

function submit() {
  loginWithEmailPassword(form.value.email, form.value.password);
}

setPageTitle('page-title.login-page');
</script>

<style lang="scss" scoped>
.login-page__form {
  max-width: 25rem;
}
</style>
