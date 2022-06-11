<template>
  <div
    :class="sideBySideFlg ? 'flex justify-between items-center': ''"
  >
    <label
      v-if="label"
      :for="uniqueId"
      class="font-medium text-gray-700"
      :class="[`text-${size}`]"
    >
      {{ label }}<span v-if="requiredFlg" class="text-red-600">*</span>
    </label>
    <div
      class="mt-1 rounded-md shadow-sm"
      :class="sideBySideFlg ? inputWidth : 'w-full'"
    >
      <input
        :id="uniqueId"
        v-model="inputValue"
        class="w-full px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
        :class="[`text-${size}`, disableFlg ? 'bg-gray-300' : requiredFlg ? 'bg-yellow-100' : '']"
        :disabled="disableFlg"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  /** 入力値 */
  inputValue: string;
  /** 任意のラベル名 */
  label?: string;
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
  (e: 'update:inputValue', text: string): string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  sideBySideFlg: false,
  inputWidth: 'w-3/4',
  size: 'md',
  requiredFlg: false,
  disableFlg: false
});
const emit = defineEmits<Emits>();

const inputValue = computed({
  get: () => props.inputValue,
  set: (value) => {
    emit('update:inputValue', value);
  },
});

/** ユニークID */
const uniqueId = computed(() => {
  return Math.random().toString(32).substring(2);
});

</script>
<style></style>
