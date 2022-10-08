<template>
  <q-item class="text-black">
    <q-item-section>
      <q-item-label class="text-no-wrap" lines="1">
        {{ file.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-circular-progress
        rounded
        size="1.2rem"
        :thickness="0.3"
        :value="34"
        color="primary"
      />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
type Props = {
  file: File;
};

defineProps<Props>();
</script>
