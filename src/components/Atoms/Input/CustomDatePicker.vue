<template>
  <Datepicker
    :uid="uniqueId"
    v-model="inputValue"
    format="yyyy/MM/dd"
    previewFormat="yyyy/MM/dd"
    :autoApply="true"
    :enableTimePicker="false"
    :inputClassName="inputClass"
    :disabled="disableFlg"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** 入力値 */
  inputValue: Date | string;
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
  label: "",
  sideBySideFlg: false,
  inputWidth: "w-3/4",
  size: "md",
  requiredFlg: false,
  disableFlg: false,
});
const emits = defineEmits<Emits>();

const inputValue = computed({
  get: () => props.inputValue,
  set: (value) => {
    if (!value) {
      emits("update:inputValue", "");
    } else {
      // yyyy-MM-ddの形式に変換する
      const refValue = value as Date;
      const year = refValue.getFullYear();
      const month = ("0" + (refValue.getMonth() + 1)).slice(-2);
      const day = ("0" + refValue.getDate()).slice(-2);
      const reflectValue = year + "-" + month + "-" + day;

      emits("update:inputValue", reflectValue);
    }
  },
});

const inputClass = computed(() => {
  let result = '';
  /** サイズ */
  if (props.size === 'sm') {
    result += 'sm'
  } else if (props.size === 'lg') {
    result += 'lg'
  }

  /** 必須フラグ */
  if (props.requiredFlg) {
    result += ' required';
  }
  return result;
});

</script>

<style>
.sm {
  @apply text-sm !important;
}
.lg {
  @apply text-lg !important;
}
.required {
  @apply bg-yellow-100 !important;
}
</style>
