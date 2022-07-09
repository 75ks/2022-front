<template>
  <input
    :id="uniqueId"
    :type="type"
    v-model="inputValue"
    class="w-full px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
    :class="[
      `text-${size}`,
      disableFlg ? 'bg-gray-300' : requiredFlg ? 'bg-yellow-100' : '',
    ]"
    :disabled="disableFlg"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** 入力値 */
  inputValue: string | number | null;
  /** type */
  type?: string;
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
  (e: "update:inputValue", value: string | number | null): string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
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
