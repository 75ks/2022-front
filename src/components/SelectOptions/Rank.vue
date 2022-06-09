<template>
  <div>
    <select
      v-model="_custCode"
      class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
    >
      <option v-for="option of selectOptionList" :key="option.code" :value="option.code" :disabled="option.disableFlg" >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
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
