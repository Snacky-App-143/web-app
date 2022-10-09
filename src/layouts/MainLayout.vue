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

    <q-page-sticky
      v-if="isUploadCardVisible"
      class="main-layout__uploading-card"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-morph:addButton:uploadSteps:300.resize="morphGroupModel"
        fab
        icon="add"
        color="primary"
        @click="morphGroupModel = UploadSteps.UPLOADING"
      />
      <div
        v-morph:uploading:uploadSteps:300.resize="morphGroupModel"
        class="absolute-bottom-right"
        :class="{
          'main-layout__uploading-card--mobile':
            morphGroupModel === UploadSteps.UPLOADING,
        }"
      >
        <UploadingCard @close="morphGroupModel = UploadSteps.ADD_BUTTON" />
      </div>
    </q-page-sticky>

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
import useGallery, { UploadSteps } from 'src/composables/useGallery';
import useUtility from 'src/composables/useUtility';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import { onMounted } from 'vue';
import UploadingCard from 'src/components/gallery/UploadingCard.vue';

const appStore = useAppStore();
const { setMainLayoutMounted } = appStore;
const { signOut, user } = useAuthentication();
const { confirm, t } = useUtility();
const { morphGroupModel, filesToUpload, isUploadCardVisible } = useGallery();

const startSignOut = () => {
  confirm({
    color: 'negative',
    message: t('main-layout.confirm-log-out'),
  }).onOk(signOut);
};

onMounted(setMainLayoutMounted);
</script>

<style lang="scss" scoped>
.main-layout__uploading-card {
  z-index: 1;
}

.main-layout__uploading-card--mobile {
  max-width: calc(100vw - 2.3rem);
}
</style>
