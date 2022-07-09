<template>
  <label
    v-if="label"
    :for="uniqueId"
    class="font-medium text-gray-700"
    :class="[`text-${size}`]"
  >
    {{ label }}<span v-if="requiredFlg" class="text-red-600">*</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  /** 任意のラベル名 */
  label: string;
  /** サイズ */
  size: string;
  /** 必須フラグ */
  requiredFlg: boolean;
  /** ユニークID */
  uniqueId: string;
}

const props = defineProps<Props>();
</script>

<style></style>
