<template>
  <q-input v-bind="$props" outlined dense> </q-input>
</template>

<script lang="ts" setup>
import { QInputProps } from 'quasar';
interface Props extends QInputProps {}
defineProps<Props>();
</script>
