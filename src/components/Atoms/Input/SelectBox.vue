<template>
  <select
    :id="uniqueId"
    v-model="inputValue"
    class="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
    :class="[
      `text-${size}`,
      disableFlg ? 'bg-gray-300' : requiredFlg ? 'bg-yellow-100' : '',
    ]"
    :disabled="disableFlg"
  >
    <option v-for="(option, index) of options" :value="option.id" :key="index">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type SelectOption = {
  id: number | string | null
  name: string
}

interface Props {
  /** 入力値 */
  inputValue: number | string | null;
  /** 選択リスト */
  options?: SelectOption[];
  /** サイズ */
  size?: string;
  /** 必須フラグ */
  requiredFlg?: boolean;
  /** 無効フラグ */
  disableFlg?: boolean;
  /** ユニークID */
  uniqueId: string;
}

interface Emits {
  (e: "update:inputValue", value: number | string | null): string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  size: "md",
  requiredFlg: false,
  disableFlg: false,
});
const emits = defineEmits<Emits>();

const inputValue = computed({
  get: () => props.inputValue,
  set: (value) => {
    emits("update:inputValue", value);
  },
});
</script>

<style></style>
