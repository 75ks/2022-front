<template>
  <select
    :id="uniqueId"
    v-model="selectValue"
    class="w-full px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
    :class="[
      `text-${size}`,
      disableFlg ? 'bg-gray-300' : requiredFlg ? 'bg-yellow-100' : '',
    ]"
    :disabled="disableFlg"
  >
    <option
      v-for="(option, index) of options"
      :value="option.code"
      :key="index"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SelectOption } from "../../../models/SelectOption";

interface Props {
  /** 入力値 */
  selectValue: number | string | null;
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
  (e: "update:selectValue", value: number | string | null): string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  size: "md",
  requiredFlg: false,
  disableFlg: false,
});
const emits = defineEmits<Emits>();

const selectValue = computed({
  get: () => props.selectValue,
  set: (value) => {
    emits("update:selectValue", value);
  },
});
</script>

<style></style>
