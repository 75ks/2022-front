<template>
  <input
    type="text"
    :value="modelValue"
    :id="inputId"
    @input="onInputValue"
    class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  inputId?: string,
  modelValue: string | number | null
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const onInputValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emits('update:modelValue', target.value);
}
</script>

<style>
</style>
