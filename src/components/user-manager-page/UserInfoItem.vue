<template>
  <div class="flex items-center">
    <div class="col-auto q-pr-sm flex items-center">
      <q-icon :name="icon" color="info" size="xs"></q-icon>
    </div>
    <div class="col">
      <!-- Email -->
      <a v-if="type === 'email'" class="text-primary" :href="`mailto:${info}`">
        {{ info }}
      </a>

      <!-- Phone -->
      <a v-if="type === 'phone'" class="text-primary" :href="`tel:${info}`">
        {{ info }}
      </a>

      <!-- Text -->
      <p v-if="type === 'text'" class="q-mb-none text-capitalize">
        {{ info }}
      </p>

      <!-- Date -->
      <p v-if="type === 'date'" class="q-mb-none">
        {{ $dateFomatter({ value: info }) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    info: string;
    type?: 'phone' | 'email' | 'text' | 'gender' | 'date';
  }>(),
  {
    type: 'text',
  }
);
</script>
