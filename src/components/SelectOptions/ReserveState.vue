<template>
  <select
    v-model="modelValue"
    :id="selectId"
    @change="onChangeValue"
    class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
  >
    <option value=null disabled>指定なし</option>
    <option v-for="[key, value] of Array.from(ReserveStates)" :key="key" :value="key">
      {{ value }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ReserveStates } from '../../constants/ReserveStates';

const props = defineProps<{
  selectId?: string,
  modelValue: number | null
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const onChangeValue = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emits('update:modelValue', target.value);
}
</script>

<style>
</style>
