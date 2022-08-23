<template>
  <q-page class="row items-center justify-evenly"> </q-page>
</template>

<script lang="ts" setup>
import { useAppStore } from 'src/stores/app';

const { setPageTitle } = useAppStore();

setPageTitle('page-title.home-page');
</script>
