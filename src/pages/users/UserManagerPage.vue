<template>
  <q-page> </q-page>
</template>

<script lang="ts" setup>
import { useAppStore } from 'src/stores/app';

const { setPageTitle } = useAppStore();

setPageTitle('page-title.user-manager');
</script>
