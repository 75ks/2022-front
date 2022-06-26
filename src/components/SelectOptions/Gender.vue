<template>
  <label for="gender" class="block">
    性別<span v-if="requiredFlg" class="text-red-600">*</span>
  </label>
  <select
    v-model="selectValue"
    id="gender"
    class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
    :class="[requiredFlg ? 'bg-yellow-100' : '']"
  >
    <option value="指定なし">指定なし</option>
    <option v-for="[key, value] of Array.from(Gender)" :key="key" :value="key">
      {{ value }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { SelectOption } from '../../models/selectOption';
import { computed, ref } from 'vue';
import { Gender } from '../../constants/Gender';
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

</script>

<style>
</style>
