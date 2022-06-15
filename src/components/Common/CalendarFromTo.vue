<template>
  <div class="flex items-end justify-center">
    <CalenderInput
      v-model:inputValue='fromInputValue'
      :label="label"
      :sideBySideFlg="sideBySideFlg"
      :inputWidth="inputWidth"
      :size="size"
      :requiredFlg="requiredFlg"
      :disableFlg="disableFlg"

    />
    <span class="mx-2 mb-1">〜</span>
    <CalenderInput
      v-model:inputValue='toInputValue'
      :sideBySideFlg="sideBySideFlg"
      :inputWidth="inputWidth"
      :size="size"
      :requiredFlg="requiredFlg"
      :disableFlg="disableFlg"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CalenderInput from './CalendarInput.vue';

interface Props {
  /** 入力値(下限) */
  fromInputValue: string;
  /** 入力値(上限) */
  toInputValue: string;
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
  (e: 'update:fromInputValue', value: string): string;
  (e: 'update:toInputValue', value: string): string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  sideBySideFlg: false,
  inputWidth: 'w-3/4',
  size: 'md',
  requiredFlg: false,
  disableFlg: false
});
const emits = defineEmits<Emits>();

const fromInputValue = computed({
  get: () => props.fromInputValue,
  set: (value) => {
    emits('update:fromInputValue', value);
  },
});
const toInputValue = computed({
  get: () => props.toInputValue,
  set: (value) => {
    emits('update:toInputValue', value);
  },
});

</script>

<style>
</style>
