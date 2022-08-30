<template>
  <q-select
    v-bind="$props"
    outlined
    dense
    dropdown-icon="mdi-chevron-down"
  ></q-select>
</template>

<script setup lang="ts">
import { QSelectProps } from 'quasar';
interface Props extends QSelectProps {}
defineProps<Props>();
</script>
