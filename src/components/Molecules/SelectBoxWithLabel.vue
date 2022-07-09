<template>
  <div :class="sideBySideFlg ? 'flex justify-between items-center' : ''">
    <InputLabel
      :label="label"
      :size="size"
      :requiredFlg="requiredFlg"
      :uniqueId="uniqueId"
    />
    <div
      class="mt-1 rounded-md shadow-sm"
      :class="sideBySideFlg ? inputWidth : 'w-full'"
    >
      <SelectBox
        v-model:inputValue="inputValue"
        :options="options"
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
import InputLabel from "../Atoms/label/InputLabel.vue";
import SelectBox, { SelectOption } from "../Atoms/Input/SelectBox.vue";

interface Props {
  /** 入力値 */
  inputValue: number | string | null;
  /** 選択リスト */
  options?: SelectOption[];
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
  (e: "update:inputValue", value: number | string | null): string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
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
