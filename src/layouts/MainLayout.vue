<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ $t(pageTitle) }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from 'src/stores/app';

const appStore = useAppStore();
const { pageTitle } = storeToRefs(appStore);
</script>
