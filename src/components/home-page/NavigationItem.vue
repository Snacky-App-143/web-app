<template>
  <div class="navigation-item__wrapper full-width cursor-pointer">
    <q-card
      class="navigation-item__card fit absolute"
      @click="$router.push(to)"
    >
      <q-card-section class="flex flex-center column fit no-wrap">
        <q-space></q-space>
        <q-icon :name="icon" color="primary" size="6rem"></q-icon>
        <q-space></q-space>
        <div class="text-center text-body1 text-weight-medium">{{ title }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

defineProps<{
  title: string;
  icon: string;
  to: RouteLocationRaw;
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
