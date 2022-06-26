<template>
  <label for="menu" class="block">
    メニュー<span v-if="requiredFlg" class="text-red-600">*</span>
  </label>
  <select
    v-model="selectValue"
    id="menu"
    class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
    :class="[requiredFlg ? 'bg-yellow-100' : '']"
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
  /** 選択値 */
  selectValue: string;
  /** 必須フラグ */
  requiredFlg?: boolean;
}

interface Emits {
  (e: 'update:selectValue', text: string): string;
}

const props = withDefaults(defineProps<Props>(), {
  requiredFlg: false
});

const emits = defineEmits<Emits>();

const selectValue = computed({
  get: () => props.selectValue,
  set: (value) => {
    emits('update:selectValue', value);
  }
});

const selectOptionList = ref<SelectOption[]>();

const getSelectOption = async () => {
  const { data } = await axios.get("/selectOption/menus");
  selectOptionList.value = data;
}

getSelectOption();

</script>

<style>
</style>
