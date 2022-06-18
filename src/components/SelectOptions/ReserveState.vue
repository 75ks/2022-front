<template>
  <label for="reserveState" class="block">予約状態</label>
  <select
    v-model="selectValue"
    id="reserveState"
    class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
  >
    <option v-for="option of selectOptionList" :key="option.code" :value="option.name">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import axios from '../../plugins/axios';
import { SelectOption } from '../../models/selectOption';
import { computed, ref } from 'vue';
interface Props {
  selectValue: string;
}

interface Emits {
  (e: 'update:selectValue', text: string): string;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const selectValue = computed({
  get: () => props.selectValue,
  set: (value) => {
    emits('update:selectValue', value);
  }
});

const selectOptionList = ref<SelectOption[]>();

const getSelectOption = async () => {
  const { data } = await axios.get("/selectOption/reserveStates");
  selectOptionList.value = data;
}

getSelectOption();

</script>

<style>
</style>
