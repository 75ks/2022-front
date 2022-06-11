<template>
  <div class="flex items-end justify-center">
    <IntegerInput
      v-model:inputValue='fromInputValue'
      :label="fromLabel"
      :sideBySideFlg="sideBySideFlg"
      :inputWidth="inputWidth"
      :size="size"
      :requiredFlg="requiredFlg"
      :disableFlg="disableFlg"

    />
    <span class="mx-2 mb-1">〜</span>
    <IntegerInput
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
import IntegerInput from './IntegerInput.vue';

interface Props {
  /** 入力値(下限) */
  fromInputValue: number | null
  /** 入力値(上限) */
  toInputValue: number | null
  /** 任意のラベル名(下限) */
  fromLabel?: string;
  /** 任意のラベル名(上限) */
  toLabel?: string;
  /** ラベルと入力欄横並びフラグ */
  sideBySideFlg?: boolean;
  /** 入力欄の幅 */
  inputWidth?: string
  /** サイズ */
  size?: string,
  /** 必須フラグ */
  requiredFlg?: boolean
  /** 無効フラグ */
  disableFlg?: boolean
}

interface Emits<T = unknown> {
  (e: 'update:fromInputValue', number: number): number;
  (e: 'update:toInputValue', number: number): number;
}

const props = withDefaults(defineProps<Props>(), {
  fromInputValue: null,
  toInputValue: null,
  fromLabel: '',
  toLabel: '',
  sideBySideFlg: false,
  inputWidth: 'w-3/4',
  size: 'md',
  requiredFlg: false,
  disableFlg: false
});
const emit = defineEmits<Emits>();

const fromInputValue = computed({
  get: () => props.fromInputValue,
  set: (value) => {
    emit('update:fromInputValue', value!);
  },
});
const toInputValue = computed({
  get: () => props.toInputValue,
  set: (value) => {
    emit('update:toInputValue', value!);
  },
});

</script>

<style>
</style>
