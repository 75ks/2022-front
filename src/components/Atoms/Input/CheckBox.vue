<template>
  <input
    :id="uniqueId"
    type="checkbox"
    v-model="checked"
    class="px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
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
  checked: boolean;
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
  (e: "update:checked", value: boolean): string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  requiredFlg: false,
  disableFlg: false,
});
const emits = defineEmits<Emits>();

const checked = computed({
  get: () => props.checked,
  set: (value) => {
    emits("update:checked", value);
  },
});
</script>

<style></style>
