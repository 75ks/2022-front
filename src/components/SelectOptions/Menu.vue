<template>
  <select
    :id="selectId"
    v-model="selectValue"
    @change="onChangeValue"
    class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
  >
    <option v-for="option of selectOptionList" :key="option.code" :value="option.name">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import axios from '../../plugins/axios';
import { SelectOption } from '../../models/types/selectOption';
import { ref } from 'vue';

const props = defineProps<{
  selectId?: string,
  selectValue: string
}>();

const emits = defineEmits<{
  (e: 'update:selectValue', value: string): void
}>();

const onChangeValue = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emits('update:selectValue', target.value);
}

const selectOptionList = ref<SelectOption[]>();

const getSelectOption = async () => {
  const { data } = await axios.get("/selectOption/menus");
  selectOptionList.value = data;
}

getSelectOption();
console.log(selectOptionList);

</script>

<style>
</style>
