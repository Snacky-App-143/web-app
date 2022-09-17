<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-none">
        <q-btn-group
          :id="MainLayoutSlot.prependExtraBtn"
          flat
          stretch
          unelevated
          square
        >
        </q-btn-group>
        <q-space></q-space>
        <div :id="MainLayoutSlot.middleToolbar" class="col q-px-md"></div>
        <q-space></q-space>
        <q-btn-group
          :id="MainLayoutSlot.extraBtn"
          flat
          stretch
          unelevated
          square
        >
          <q-btn
            v-if="user"
            class="order-last"
            icon="mdi-logout"
            @click="startSignOut"
          >
            <q-tooltip>
              {{ $t('main-layout.sign-out') }}
            </q-tooltip>
          </q-btn>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight absolute full-width"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import useAuthentication from 'src/composables/useAuthentication';
import useUtility from 'src/composables/useUtility';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import { onMounted } from 'vue';

const appStore = useAppStore();
const { setMainLayoutMounted } = appStore;
const { signOut, user } = useAuthentication();
const { confirm, t } = useUtility();

const startSignOut = () => {
  confirm({
    color: 'negative',
    message: t('main-layout.confirm-log-out'),
  }).onOk(signOut);
};

onMounted(setMainLayoutMounted);
</script>
