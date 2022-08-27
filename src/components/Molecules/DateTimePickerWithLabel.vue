<template>
  <div :class="sideBySideFlg ? 'flex justify-between items-center' : ''">
    <InputLabel
      :label="label"
      :size="size"
      :requiredFlg="requiredFlg"
      :uniqueId="`dp-input-${uniqueId}`"
    />
    <div
      class="mt-1 rounded-md shadow-sm"
      :class="sideBySideFlg ? inputWidth : 'w-full'"
    >
      <CustomDateTimePicker
        v-model:inputValue="inputValue"
        :size="size"
        :requiredFlg="requiredFlg"
        :disableFlg="disableFlg"
        :uniqueId="uniqueId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InputLabel from '../Atoms/label/InputLabel.vue';
import CustomDateTimePicker from '../Atoms/Input/CustomDateTimePicker.vue';

interface Props {
  /** 入力値 */
  inputValue: Date | string;
  /** 任意のラベル名 */
  label?: string;
  /** ラベルと入力欄横並びフラグ */
  sideBySideFlg?: boolean;
  /** 入力欄の幅 */
  inputWidth?: string;
  /** サイズ */
  size?: string;
  /** 必須フラグ */
  requiredFlg?: boolean;
  /** 無効フラグ */
  disableFlg?: boolean;
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
    emits("update:inputValue", value);
  },
});

/** ユニークID */
const uniqueId = computed(() => {
  return Math.random().toString(32).substring(2);
});
</script>

<style></style>
