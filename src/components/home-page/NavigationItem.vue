<template>
  <div class="navigation-item__wrapper full-width cursor-pointer">
    <q-card
      class="navigation-item__card fit absolute"
      @click="$router.push(navigationItem.to)"
    >
      <q-card-section class="flex flex-center column fit no-wrap">
        <q-space></q-space>
        <q-icon
          :name="navigationItem.icon"
          color="primary"
          :size="$q.screen.gt.xs ? '6rem' : '4rem'"
        ></q-icon>
        <q-space></q-space>
        <div class="text-center text-body1 text-weight-medium">
          {{ $t(navigationItem.title) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts" setup>
import { NavigationItem } from 'src/types/router/NavigationItem';

defineProps<{
  navigationItem: NavigationItem;
}>();
</script>

<style lang="scss" scoped>
.navigation-item__wrapper {
  padding-top: 100%;
  position: relative;
}

.navigation-item__card {
  top: 0;
  left: 0;
}
</style>
