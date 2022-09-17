<template>
  <q-input
    v-bind="$props"
    standout="bg-blue-7 text-white"
    dense
    clearable
    clear-icon="mdi-close"
    class="overflow-hidden"
    @keyup.enter="search()"
    @clear="clearSearch"
  >
    <template v-if="isFilterBtnShown" #prepend>
      <q-btn
        flat
        stretch
        icon="mdi-tune"
        color="white"
        class="snacky-search-input__filters"
      ></q-btn>
    </template>
    <template #append>
      <q-btn
        flat
        stretch
        icon="mdi-magnify"
        color="white"
        class="snacky-search-input__search"
        @click="search()"
      ></q-btn>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { QInputProps } from 'quasar';

interface Props extends QInputProps {
  isFilterBtnShown?: boolean;
}

interface Emits {
  (e: 'search', value: string | number | null | undefined): void;
  (e: 'clear-search'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function search(value?: string) {
  emit('search', value || props.modelValue);
}

function clearSearch() {
  emit('clear-search');
}
</script>

<style lang="scss" scoped>
.snacky-search-input__filters {
  margin-left: -0.75rem;
}

.snacky-search-input__search {
  margin-right: -0.75rem;
}
</style>
