<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ $t(pageTitle) }} </q-toolbar-title>
        <div :id="MainLayoutSlot.middleToolbar"></div>
        <q-space></q-space>
        <q-btn-group :id="MainLayoutSlot.extraBtn" flat stretch>
          <q-btn
            v-if="user"
            class="order-last"
            icon="mdi-logout"
            @click="signOut"
          >
            <q-tooltip>
              {{ $t('main-layout.sign-out') }}
            </q-tooltip>
          </q-btn>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useAuthentication from 'src/composables/useAuthentication';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import { onMounted } from 'vue';

const appStore = useAppStore();
const { setMainLayoutMounted } = appStore;
const { signOut, user } = useAuthentication();

const { pageTitle } = storeToRefs(appStore);

onMounted(setMainLayoutMounted);
</script>
