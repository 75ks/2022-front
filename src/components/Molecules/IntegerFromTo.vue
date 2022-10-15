<template>
  <div class="flex items-end justify-center">
    <CustomInputWithLabel
      v-model:inputValue='fromInputValue'
      type="number"
      :placeholder="fromPlaceholder"
      :label="label"
      :sideBySideFlg="sideBySideFlg"
      :inputWidth="inputWidth"
      :size="size"
      :requiredFlg="requiredFlg"
      :disableFlg="disableFlg"

    />
    <span class="mx-2 mb-1">〜</span>
    <CustomInputWithLabel
      v-model:inputValue='toInputValue'
      type="number"
      :placeholder="toPlaceholder"
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
import CustomInputWithLabel from './InputWithLabel.vue';

interface Props {
  /** 入力値(下限) */
  fromInputValue: number | null;
  /** 入力値(上限) */
  toInputValue: number | null;
  /** 任意のラベル名 */
  label?: string;
  /** プレースホルダー(下限) */
  fromPlaceholder?: string;
  /** プレースホルダー(上限) */
  toPlaceholder?: string;
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
  (e: 'update:fromInputValue', number: number): number;
  (e: 'update:toInputValue', number: number): number;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  fromPlaceholder: '',
  toPlaceholder: '',
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
    emits('update:fromInputValue', value!);
  },
});
const toInputValue = computed({
  get: () => props.toInputValue,
  set: (value) => {
    emits('update:toInputValue', value!);
  },
});

</script>

<style>
</style>
